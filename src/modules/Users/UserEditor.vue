<template lang="html">
  <component
    :is="inline ? 'div' : 'v-dialog'"
    scrollable
    :value="true"
    max-width="500"
    persistent
  >
    <v-form
      @submit.prevent="saveItem"
      v-model="isValid"
      ref="form"
      style="width:100%"
    >
      <v-card :class="{large: !appSmall}">
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          <span v-if="header">{{header}}</span>
          <span v-else>{{recordId === 'new' ? 'Create' : 'Edit'}} User</span>
        </v-card-title>

        <v-card-text
          v-if="!initialLoading"
          class="pt-4"
        >
          <v-row>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-text-field
                label="First Name"
                outlined
                v-model="record.firstname"
                :disabled="loading"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-text-field
                label="Last Name"
                outlined
                v-model="record.lastname"
                :disabled="loading"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-text-field
                label="Email Address"
                outlined
                v-model="record.username"
                :disabled="loading || (recordId && recordId !== 'new')"
                :rules="[...validation.required, ...validation.email]"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-select
                :items="units.map(u => ({text: u.system, value: u.id})) "
                v-model="record.units"
                outlined
                label="Units Of Measure"
                :disabled="loading"
                :rules="[...validation.required]"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-text-field
                label="Cell Phone"
                outlined
                v-model="record.cellnumber"
                mask="phone"
                :disabled="loading"
                :rules="record.cellnumber ? validation.phone : []"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-select
                :items="carriers.map(c => ({text: c.carrier, value: c.id})) "
                v-model="record.textprovider"
                outlined
                label="Cell Provider"
                :disabled="loading"
                :rules="record.cellnumber ? [v => !!v || 'Required'] : []"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-select
                :items="companies.map(c => ({text: c.name, value: c.id})) "
                v-model="record.company"
                outlined
                label="Company"
                :disabled="loading"
                :rules="[...validation.required]"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-text-field
                :label="recordId === 'new' ? 'Password' : 'Change Password'"
                outlined
                v-model="record.plainPassword"
                :disabled="loading"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                @click:append="showPassword = !showPassword"
                :rules="passwordRules"
              />
            </v-col>
          </v-row>
          <v-row
            v-if="user.roles === 'ROLE_ADMIN' && user.username !== record.username"
          >
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-select
                outlined
                class="mt-0"
                color="primary"
                v-model="record.roles"
                label="Role"
                :items="roleTypes.map(r => ({ text: r.name, value: r.id }))"
                :disabled="loading"
              />
            </v-col>
          </v-row>

          <v-row
            v-if="user && record && user.id === record.id && (showVerification || user.cellnumber) && !((record.verification || '') + '' === '1')"
            align="center"
          >
            <v-col
              cols="12">
              <v-alert
                type="info"
                class="mb-0"
              >A verification code has been sent to your phone.  Please enter it below to verify your phone.</v-alert>
            </v-col>
            <v-col
              cols="12"
              md="5"
              offset-md="1"
            >
              <v-text-field
                label="Phone Verification Code"
                outlined
                v-model="verificationCode"
                :disabled="loading"
                hide-details
                @keydown.enter.stop.prevent="verifyPhone"
              />
            </v-col>
            <v-col
              cols="12"
              md="5"
            >
              <v-btn
                text
                @click="resendVerification"
                :disabled="verificationLoading"
              >Resend</v-btn>
              <v-btn
                color="primary"
                @click="verifyPhone"
                :disabled="verificationLoading"
              >Verify</v-btn>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-alert :value="true" type="error" style="width:100%" v-if="error">{{error}}</v-alert>

        <v-card-actions>
          <v-btn
            v-if="!loading && !initialLoading && !inline"
            @click="$emit('close')"
            text
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-progress-circular
            v-if="loading || initialLoading"
            class="ma-2"
            indeterminate
            color="primary"
          ></v-progress-circular>
          <v-spacer></v-spacer>
          <v-btn
            v-if="!loading && !initialLoading"
            color="primary"
            text
            type="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </component>
</template>

<style lang="scss" scoped>
.large {
  .layout {
    .flex:first-child {
      padding-right: 8px;
    }
    .flex:last-child:not(:first-child) {
      padding-left: 8px;
    }
  }
}
</style>

<script>
import { mapState, mapActions } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import pick from 'lodash/pick'
import get from 'lodash/get'
import { VDialog } from 'vuetify/lib'
import ValidationMixin from '@/mixins/ValidationMixin'
import axios from 'axios'

export default {
  mixins: [ValidationMixin],
  components: {
    VDialog
  },
  props: {
    recordId: {
      type: String
    },
    inline: {
      type: Boolean,
      default: false
    },
    header: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      record: {
        verification: null
      },
      error: null,
      showPassword: false,
      initialLoading: true,
      verificationLoading: false,
      verificationCode: null,
      showVerification: false
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState('users', {
      loading: 'loading'
    }),
    ...mapState('units', {
      units: 'data'
    }),
    ...mapState('companies', {
      companies: 'data'
    }),
    ...mapState('carriers', {
      carriers: 'data'
    }),
    ...mapState('roleTypes', {
      roleTypes: 'data'
    }),
    passwordRules () {
      if (this.recordId === 'new' || (this.record.plainPassword && this.record.plainPassword.first)) {
        return [
          ...this.validation.required,
          v => v.length >= 8 || 'At least 8 characters'
        ]
      }
      return []
    }
  },
  methods: {
    ...mapActions('users', {
      save: 'save',
      getItem: 'get'
    }),
    ...mapActions('roleTypes', {
      findRoleTypes: 'find'
    }),
    async saveItem () {
      if (!this.isValid) {
        this.$refs.form.validate()
        return
      }
      this.error = null
      try {
        let data = { ...this.record }
        this.record = await this.save([
          pick(data, ['username', 'plainPassword', 'firstname', 'lastname', 'cellnumber', 'company', 'textprovider', 'units', 'roles']), // 'roles'
          { forceCreate: this.recordId === 'new' }
        ])
        this.showVerification = !!this.record.cellnumber
        if (!this.record.cellnumber || (this.record.cellnumber && (this.record.verification || '') + '' === '1')) {
          this.$emit('close', this.record)
        }
      } catch (e) {
        this.error = get(e, 'response.data') || e
        throw e
      }
    },
    async resendVerification () {
      try {
        this.verificationLoading = true
        await axios({
          method: 'GET',
          url: '/rest/user/verify/text'
        })
        this.verificationLoading = false
      } catch (e) {
        this.verificationLoading = false
        throw e
      }
    },
    async verifyPhone () {
      try {
        this.verificationLoading = true
        await axios({
          method: 'POST',
          url: '/rest/user/verify/text',
          data: {
            code: this.verificationCode
          }
        })
        this.verificationLoading = false
      } catch (e) {
        this.verificationLoading = false
        throw e
      }
      this.saveItem()
    }
  },
  async created () {
    await this.findRoleTypes({ populate: true })
    if (!this.recordId) {
      this.initialLoading = false
    } else {
      this.initialLoading = true
      try {
        let user = {
          units: 1
        }
        if (this.recordId !== 'new') {
          user = await this.getItem(this.recordId)
        }
        this.record = cloneDeep(user)
        this.initialLoading = false
      } catch (e) {
        this.initialLoading = false
        throw e
      }
    }
  }
}
</script>
