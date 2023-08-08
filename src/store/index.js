import Vue from 'vue'
import Vuex from 'vuex'
import './http'
import axios from 'axios'
import router from '../router'
import jwtDecode from 'jwt-decode'
import moment from 'moment-timezone'

Vue.use(Vuex)

// Polling to check JWT timeout
setInterval(() => {
    if (store.state.jwtExpiration && store.state.jwtExpiration - moment().unix() < 0) {
        window.localStorage.setItem('token', '')
        store.commit('setUser', null)
        store.commit('setJwtExpiration', null)
        console.log('auto logout, token expired')
    }
}, 10000)

let errorTimeout

const axiosInstance = axios.create()
axiosInstance.interceptors.request.use((config) => {
    config.headers = {
        ...(config.headers || {})
    }
    if (window.localStorage.getItem('token') && !Object.keys(config.headers).includes('Authorization')) {
        const currentToken = JSON.parse(window.localStorage.getItem('token'))
        config.headers['Authorization'] = 'Bearer ' + currentToken.token
    }
    config.headers['Accept'] = 'application/json';
    return config
})

Vue.$http = Vue.prototype.$http = axiosInstance

const store = new Vuex.Store({
    state: {
        loading: true,
        user: null,
        showNav: false,
        showUserNav: false,
        jwtExpiration: null,
        globalError: null
    },
    mutations: {
        setLoading(state, loading) {
            state.loading = loading
        },
        setUser(state, user) {
            state.user = user
        },
        setJwtExpiration(state, value) {
            state.jwtExpiration = value
        },
        setShowNav(state, value) {
            state.showNav = value
        },
        setShowUserNav(state, value) {
            state.showUserNav = value
        },
        setGlobalError(state, value) {
            state.globalError = value
            clearTimeout(errorTimeout)
            if (value) {
                errorTimeout = setTimeout(() => {
                    state.globalError = null
                }, 10000)
            }
        }
    },
    getters: {
        readOnly: (state) => {
            return state.user && ['ROLE_READONLY', 'ROLE_SELECTION'].includes(state.user.roles) // If the user has a read-only role
        },
        userRole: (state) => {
            return (state.user && state.user.roles) || null
        }
    },
    actions: {
        async refreshToken() {
            let currentToken = window.localStorage.getItem('token')
            if (currentToken) {
                currentToken = JSON.parse(currentToken)
                const response = await Vue.$http({
                    method: 'POST',
                    headers: {
                        'Authorization': ''
                    },
                    data: {
                        refresh_token: currentToken.refresh_token
                    }
                })
                if (response.data?.token) {
                    window.localStorage.setItem('token', JSON.stringify(response.data))
                    return response.data
                }
            }
        },
        async rootBootstrap({dispatch, commit}) {
            let currentToken = window.localStorage.getItem('token')
            let decodedToken
            commit('setLoading', true)
            try {
                if (currentToken) {
                    currentToken = JSON.parse(currentToken)
                    decodedToken = jwtDecode(currentToken.token)
                    if (decodedToken && decodedToken.exp) {
                        // ADD FOR LOCAL DEV
                        // commit('setJwtExpiration', moment().add(1, 'hour').unix())
                        if (decodedToken.exp < moment().unix()) {
                            // If there's a refresh token, refresh it
                            if (currentToken.refresh_token) {
                                currentToken = await dispatch('refreshToken')
                                if (currentToken) {
                                    decodedToken = jwtDecode(currentToken.token)
                                    commit('setJwtExpiration', decodedToken.exp)
                                }
                            } else {
                                currentToken = null
                            }
                        } else {
                            commit('setJwtExpiration', decodedToken.exp)
                        }
                    } else {
                        console.log('invalid token', decodedToken)
                        currentToken = null
                    }
                }

                if (!currentToken?.userIri) {
                    commit('setUser', null)
                    commit('setLoading', false)
                    return
                }

                let response = await Vue.$http({
                    method: 'GET',
                    url: '/api' + currentToken.userIri,
                })
                if (response && response.data) {
                    commit('setUser', response.data)
                    await dispatch('bootstrap')
                }
                commit('setLoading', false)
            } catch (e) {
                console.log('root bootstrap error', e)
                commit('setUser', null)
                commit('setLoading', false)
            }
        },
        async logout({commit}) {
            commit('setUser', null)
            commit('setJwtExpiration', null)
            window.localStorage.setItem('token', '')
            try {
                router.push({path: '/'})
            } catch (e) {
                // avoid logging redundant nav error that is pointless
            }
        }
    }
})

window.$store = store

export default store
