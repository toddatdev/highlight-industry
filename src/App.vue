<template>
    <v-app class="">
        <v-container
            fluid
            fill-height
            align-center
            justify-center
            v-if="loading"
        >
            <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
            />
        </v-container>
        <LogIn
            v-else-if="!user"
        />
        <div v-else>
            <v-navigation-drawer
                :value="!appSmall || showNav"
                @input="$store.commit('setShowNav', $event)"
                fixed
                left
                app
                :mobile-break-point="960"
                width="200"
                style="z-index: 10; background-color: #2ca58d"
            >
                <NavigationMenu/>
            </v-navigation-drawer>
            <v-navigation-drawer
                :value="showUserNav"
                @input="$store.commit('setShowUserNav', $event)"
                fixed
                clipped
                right
                app
                width="200"
                style="z-index: 10"
            >
                <NavigationUserMenu/>
            </v-navigation-drawer>
            <v-content>
                <router-view></router-view>
            </v-content>
        </div>
        <v-snackbar
            v-model="showJwtSnackbar"
            bottom
            multi-line
            vertical
            :timeout="0"
        >
            Your session will expire in {{ jwtExpirationSeconds }} seconds
            <v-row>
                <v-col>
                    <v-btn
                        color="white"
                        text
                        @click="$store.dispatch('logout')"
                    >
                        Log In
                    </v-btn>
                </v-col>
                <v-col class="text-right">
                    <v-btn
                        color="white"
                        text
                        @click="showJwtSnackbar = false"
                    >
                        Close
                    </v-btn>
                </v-col>
            </v-row>
        </v-snackbar>
        <v-snackbar
            :value="globalError"
            color="error"
            bottom
            multi-line
            vertical
            :timeout="0"
            style="z-index: 100000"
            @click="$store.commit('setGlobalError', globalError)"
        >
            <div
                class="d-flex"
            >
                <div class="flex-grow-1">{{ globalError }}</div>
                <div>
                    <v-btn
                        color="white"
                        text
                        @click.stop="$store.commit('setGlobalError', null)"
                    >
                        Close
                    </v-btn>
                </div>
            </div>
        </v-snackbar>
    </v-app>
</template>

<style lang="scss">
body {
    background-color: #dfdfdf;

    &.content-full-height {
        .v-content {
            height: 100vh;
        }
    }
}
</style>

<script>
import LogIn from '@/components/Login'
import NavigationMenu from '@/components/NavigationMenu'
import NavigationUserMenu from '@/components/NavigationUserMenu'
import {mapState} from 'vuex'
import moment from 'moment-timezone'

export default {
    name: 'App',
    components: {
        LogIn,
        NavigationMenu,
        NavigationUserMenu
    },
    data() {
        return {
            showJwtSnackbar: null,
            jwtExpirationSeconds: null
        }
    },
    computed: {
        ...mapState(['loading', 'user', 'showNav', 'showUserNav', 'jwtExpiration', 'globalError'])
    },
    mounted() {
        document.addEventListener('click', () => {
            this.$store.commit('setShowUserNav', false)
            this.$store.commit('setShowNav', false)
        })
        this.checkSessionTimeoutInterval = setInterval(() => {
            if (!this.jwtExpiration) {
                return
            }
            if (this.showJwtSnackbar === null && this.jwtExpiration < moment().add(2, 'minute').unix()) {
                this.showJwtSnackbar = true
            } else if (this.showJwtSnackbar && this.jwtExpiration > moment().add(2, 'minute').unix()) {
                this.showJwtSnackbar = null
            }
            if (this.jwtExpiration) {
                this.jwtExpirationSeconds = this.jwtExpiration - moment().unix()
            }
        }, 1000)
    },
    beforeDestroy() {
        clearInterval(this.checkSessionTimeoutInterval)
    }
}
</script>
