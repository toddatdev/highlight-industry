<template>
    <div>
        <main-toolbar>
            <v-toolbar-title>Profile</v-toolbar-title>
        </main-toolbar>
        <v-container>
            <v-row>
                <v-col
                    cols="12"
                    md="6"
                    offset-md="3"
                >
                    <UserEditor
                        v-if="user"
                        inline
                        :recordId="user.username"
                        header="Your Profile"
                        @close="close"
                    />
                    <div class="mt-4" v-if="remaining">Your Session Expires in {{ stringRemaining }}</div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import moment from 'moment-timezone'
import {mapState} from 'vuex'
import parseSeconds from 'parse-seconds'
import UserEditor from '../Users/UserEditor'

export default {
    components: {
        UserEditor
    },
    data() {
        return {
            remaining: null
        }
    },
    computed: {
        ...mapState(['user', 'jwtExpiration']),
        stringRemaining() {
            if (!this.remaining || typeof this.remaining !== 'object') {
                return '?'
            }
            return Object.entries(this.remaining).filter(([, v]) => v > 0).map(([key, value]) => value + key.charAt(0)).join(' ')
        }
    },
    methods: {
        calculateRemaining() {
            let now = moment().unix()
            if (!this.jwtExpiration || this.jwtExpiration < now) {
                this.remaining = null
                return
            }
            this.remaining = parseSeconds({years: false, weeks: false})(this.jwtExpiration - now)
        },
        close(user) {
            if (user) {
                this.$store.commit('setUser', user)
            }
            this.$router.go(-1)
        }
    },
    created() {
        this.remainingInterval = setInterval(() => {
            this.calculateRemaining()
        }, 1000)
    },
    beforeDestroy() {
        clearInterval(this.remainingInterval)
    }
}
</script>
