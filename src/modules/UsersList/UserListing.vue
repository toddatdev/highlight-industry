<template>
    <div class="mx-5 my-5 modal-class">
        <v-data-table
        :headers="headers"
        :items="users"
        sort-by="calories"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title>Users List</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                    v-model="dialog"
                    max-width="600px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            @click="editmode = false"
                            v-on="on"
                        >
                            <v-icon small>fa-plus</v-icon>
                            New user
                        </v-btn>
                    </template>
                    <v-form
                        @submit.prevent="onSubmit"
                        ref="form"
                        lazy-validation
                    >
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            lg="6"
                                        >
                                            <v-text-field
                                                label="First name*"
                                                v-model="editedItem.FirstName"
                                                :rules="validationRulres.nameRules"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            lg="6"

                                        >
                                            <v-text-field
                                                label="Last name*"
                                                v-model="editedItem.LastName"
                                                :rules="validationRulres.nameRules"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="Email*"
                                                v-model="editedItem.email"
                                                :rules="validationRulres.emailRules"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="Password*"
                                                v-model="editedItem.plainPassword"
                                                :rules="editmode ? [] : validationRulres.passRules"
                                                :type="show ?'text':
                                                'password'"
                                                :append-icon="show ?'fa-eye':'fa-eye-slash'"
                                                @click:append="show=!show"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                        >
                                            <v-text-field
                                                label="Company*"
                                                v-model="editedItem.Company"
                                                :rules="validationRulres.companyRules"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                        >
                                            <v-select
                                                :items="['ROLE_GLOBAL_ADMIN', 'ROLE_GLOBAL_USER']"
                                                label="Role*"
                                                :rules="validationRulres.roleRules"
                                                v-model="editedItem.roles"
                                                required
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="close"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    v-if="!editmode"
                                    :disabled="saveloader"
                                    :loading="saveloader"
                                    color="blue darken-1"
                                    text
                                    @click="save"
                                >
                                    Save
                                </v-btn>
                                <v-btn
                                    v-if="editmode"
                                    :disabled="saveloader"
                                    :loading="saveloader"
                                    color="blue darken-1"
                                    text
                                    @click="updateUser"
                                >
                                    update
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>

                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card class="py-5 text-center">
                        <i color="red darken-2" class="fa fa-exclamation-circle mt-2 mb-3 fa-4x text-center"></i>
                        <h4 class="text-center">Are you sure you want to delete this item?</h4>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-2" class="" text @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue darken-5" text @click="deleteItemConfirm(editedItem)">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                fa-edit
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                fa-trash
            </v-icon>
        </template>
<!--        <template v-slot:no-data>-->
<!--            <v-btn-->
<!--                color="primary"-->
<!--                @click="initialize"-->
<!--            >-->
<!--                Reset-->
<!--            </v-btn>-->
<!--        </template>-->
    </v-data-table>
        <v-container
                fluid
                fill-height
                align-center
                justify-center
                v-if="dataLoader"
            >
                <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
                />
        </v-container>
    </div>
</template>

<script>
// import axios from 'axios';
import get from "lodash/get";
export default {
    data: () => ({
        show:false,
        dialog: false,
        dialogDelete: false,
        headers: [
            {text: 'Id', align: 'start', sortable: false, value: 'id'},
            { text: 'Email', value: 'email' },
            { text: 'Role', value: 'roles' },
            { text: 'First Name', value: 'FirstName' },
            { text: 'Last Name', value: 'LastName' },
            { text: 'Company', value: 'Company' },
            { text: 'Action', value: 'actions', sortable: false },
        ],
        users: [],
        editedIndex: -1,
        editedItem: {
            id : null,
            email: '',
            plainPassword: '',
            roles: '',
            FirstName: '',
            LastName: '',
            Company: '/customers/ATLA09',
        },
        defaultItem: {
            email: '',
            plainPassword:'',
            roles: '',
            FirstName: '',
            LastName: '',
            Company: '/customers/ATLA09',
        },
        saveloader : false,
        dataLoader : false,
        editmode : false,
        userData : {

        },
        validationRulres : {
            nameRules: [
                v => !!v || 'Required field',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passRules: [
                v => !!v || 'Password is required',
                v => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/.test(v) || 'Password has at least number and at least special character between 6 to 10 characters',
            ],
            roleRules: [
                v => !!v || 'Role is required'
            ],
            companyRules: [
                v => !!v || 'Company is required',
            ],
        },

    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New User' : 'Edit User'
        },
    },

    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },

    created () {
        this.initialize()
    },

    methods: {
        async initialize () {
            try {
                this.dataLoader = true;
                let response = await this.$http({
                    method: 'GET',
                    url: 'https://dev-rest.highlightportal.com/users',
                })
                this.users = response.data
                this.dataLoader = false;

                this.loading = false

            } catch (error) {
                console.error(error)
                this.loading = false
                if (get(error, 'error.data.error')) {
                    this.error = error?.response?.data?.detail || error.error.data.error
                } else {
                    this.error = 'No Users Data Available'
                }
                throw error
            }
        },

        editItem (item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.editedItem.roles = item.roles[0];
            this.editmode = true;
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        async deleteItemConfirm (item) {
            let userId = item.id;
            this.users.splice(this.editedIndex, 1)
            this.closeDelete();
            try {
                await this.$http({
                    method: 'DELETE',
                    url: `/api/users/${userId}`,
                })
                this.loading = false;

            }
            catch (error) {
                console.error(error)
                if (get(error, 'error.data.error')) {
                    this.error = error?.response?.data?.detail || error.error.data.error
                } else {
                    this.error = 'No Users Data Available'
                }
                throw error
            }
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
            this.$refs.form.resetValidation();
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
            this.$refs.form.resetValidation();
        },

         async save () {
            let success = this.$refs.form.validate();
                if (success) {
                    let user = this.users.find(
                        (x) => x.email == this.editedItem.email
                    );
                    if (user) {
                        alert("User is already exist with this Email");
                        return;
                    }

                    try {
                        this.saveloader = true;
                         let url = '/api/users';
                         await this.$http.post(
                            url,
                             {
                                 'email': this.editedItem.email,
                                 'plainPassword': this.editedItem.plainPassword,
                                 'roles': [this.editedItem.roles],
                                 'FirstName': this.editedItem.FirstName,
                                 'LastName': this.editedItem.LastName,
                                 'Company': this.editedItem.Company,
                             },
                        {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        this.saveloader = false;
                        this.initialize();

                    } catch (error) {
                        console.error(error)
                        if (get(error, 'error.data.error')) {
                            this.error = error?.response?.data?.detail || error.error.data.error
                        } else {
                            this.error = 'No Users Data Available'
                        }
                        throw error
                    }
                    this.close()
                }
        },

        async updateUser () {
            let success = this.$refs.form.validate();
            if (success) {
                let userId = this.editedItem.id;
                try {
                    this.saveloader = true;
                    let url = `/api/users/${userId}`;
                    await this.$http.patch(
                        url,
                        {
                            'id' : this.editedItem.id,
                            'email': this.editedItem.email,
                            'plainPassword': this.editedItem.plainPassword,
                            'roles': [this.editedItem.roles],
                            'FirstName': this.editedItem.FirstName,
                            'LastName': this.editedItem.LastName,
                            'Company': this.editedItem.Company,
                        },
                        {
                            headers: {
                                "Content-Type": "application/merge-patch+json"
                            }
                        })
                    this.saveloader = false;
                    this.dataLoader = false;
                    this.initialize();

                } catch (error) {
                    console.error(error)
                    if (get(error, 'error.data.error')) {
                        this.error = error?.response?.data?.detail || error.error.data.error
                    } else {
                        this.error = 'No Users Data Available'
                    }
                    throw error
                }
                this.close()
            }
        },
    },
}
</script>

<style scoped>
.v-progress-circular {
    margin: 1rem;
}
.modal-class .spiner{
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
</style>
