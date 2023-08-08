<template lang="html">
    <div class="login-container" style="height: 100%">
        <v-container
            fluid
            fill-height
            style="background-size: cover; background-image: url('img/hli-building-darkened.png'); background-position-y: top"
        >
            <v-row align="center" justify="center">
                <v-col
                    cols="12"
                    sm="8"
                    md="4"
                >
                    <v-card class="elevation-12" v-if="token">
                        <v-form @submit.prevent="savePassword">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Reset Password</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <p class="text-muted">Please choose a new password</p>

                                <v-text-field
                                    prepend-icon="fa-lock"
                                    browserr-autocomplete="new-password"
                                    label="New Password"
                                    :disabled="loading"
                                    v-model="plainPassword"
                                    :append-icon="showPassword2 ? 'fa-eye-slash' : 'fa-eye'"
                                    placeholder=" "
                                    :type="showPassword2 ? 'text' : 'password'"
                                    @click:append="showPassword2 = !showPassword2"
                                />
                                <v-alert :value="!!error" type="error">{{ error }}</v-alert>
                            </v-card-text>
                            <v-card-actions class="pa-3">
                                <v-spacer></v-spacer>
                                <v-progress-circular
                                    v-if="loading"
                                    indeterminate
                                    color="primary"
                                ></v-progress-circular>
                                <v-btn
                                    v-else
                                    :disabled="loading"
                                    color="primary"
                                    type="submit"
                                >
                                    Save Password
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>

                    <v-card class="elevation-12" v-else-if="forgotSent">
                        <v-form @submit.prevent="getToken">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Reset Password</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <p class="text-muted" v-if="forgot">A code has been sent to your email address. Please
                                    enter it
                                    below.</p>

                                <v-text-field
                                    prepend-icon="fa-key"
                                    label="Verification Code"
                                    type="tel"
                                    v-model="verificationCode"
                                    :disabled="loading"
                                    ref="code"
                                    placeholder=" "
                                    autofocus
                                />
                                <v-alert :value="!!error" type="error">{{ error }}</v-alert>
                            </v-card-text>
                            <v-card-actions class="pa-3">
                                <v-btn
                                    v-if="forgot"
                                    :disabled="loading"
                                    color="default"
                                    @click="doForgot()"
                                >Send Again
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-progress-circular
                                    v-if="loading"
                                    indeterminate
                                    color="primary"
                                ></v-progress-circular>
                                <v-btn
                                    v-else
                                    :disabled="loading"
                                    color="primary"
                                    type="submit"
                                >
                                    Continue
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>

                    <v-card class="elevation-12" v-else-if="forgot">
                        <v-form @submit.prevent="doForgot">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Forgot Password</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <p>Enter your email address to reset your password</p>
                                <v-text-field
                                    prepend-icon="fa-user"
                                    label="Email"
                                    type="email"
                                    v-model="auth.email"
                                    :disabled="loading"
                                ></v-text-field>
                                <v-alert :value="!!error" type="error">{{ error }}</v-alert>
                            </v-card-text>
                            <v-card-actions class="pa-3">
                                <v-btn
                                    v-if="!loading"
                                    color="default"
                                    @click="resetForm()"
                                >
                                    Nevermind
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-progress-circular
                                    v-if="loading"
                                    indeterminate
                                    color="primary"
                                ></v-progress-circular>
                                <v-btn
                                    v-else
                                    color="primary"
                                    type="submit"
                                >
                                    Continue
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                    <v-card class="elevation-12" v-else>
                        <v-form @submit.prevent="doLogin">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Highlight Portal</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-alert
                                    type="success"
                                    v-if="resetSuccess"
                                >Your password has been reset. Please log in.
                                </v-alert>
                                <v-text-field
                                    prepend-icon="fa-user"
                                    label="Email"
                                    type="email"
                                    v-model="auth.email"
                                    :disabled="loading"
                                    ref="email"
                                    placeholder=" "
                                    autofocus
                                />
                                <v-text-field
                                    prepend-icon="fa-lock"
                                    browserr-autocomplete="new-password"
                                    label="Password"
                                    :disabled="loading"
                                    v-model="auth.password"
                                    :append-icon="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                                    placeholder=" "
                                    :type="showPassword ? 'text' : 'password'"
                                    @click:append="showPassword = !showPassword"
                                />
                                <v-alert :value="!!error" type="error">{{ error }}</v-alert>
                            </v-card-text>
                            <v-card-actions class="pa-3">
                                <v-btn
                                    v-if="!loading"
                                    color="default"
                                    @click="setForgot(true)"
                                >Forgot Password
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-progress-circular
                                    v-if="loading"
                                    indeterminate
                                    color="primary"
                                ></v-progress-circular>
                                <v-btn
                                    v-else
                                    color="primary"
                                    type="submit"
                                >
                                    Login
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style lang="scss" scoped>
.login-container {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 100000;
    background-color: rgba(0, 0, 0, 0.3);
}
</style>

<script>
import get from 'lodash/get'

export default {
    data() {
        return {
            loading: false,
            error: null,
            auth: {
                email: '',
                password: ''
            },
            showPassword: false,
            showPassword2: false,
            forgot: false,
            forgotSent: false,
            verificationCode: '',
            token: null,
            plainPassword: '',
            resetSuccess: false
        }
    },
    methods: {
        resetForm() {
            this.error = null
            this.forgot = false
            this.forgotSent = false
            this.token = null
            this.newPassword = null
            this.verifyPassword = null
            this.resetSuccess = false
        },
        async doLogin() {
            this.error = false
            this.loading = true
            try {
                let response = await this.$http({
                    method: 'POST',
                    url: 'https://dev-rest.highlightportal.com/auth/token',
                    data: this.auth
                })

                // Extract the token from the response and pull the user data
                window.localStorage.setItem('token', JSON.stringify(response.data))
                await this.$store.dispatch('rootBootstrap')
                this.loading = false
            } catch (error) {
                console.error(error)
                this.loading = false
                if (get(error, 'error.data.error')) {
                    this.error = error?.response?.data?.detail || error.error.data.error
                } else {
                    this.error = 'Unable to log in with those credentials.'
                }
                throw error
            }
        },
        setForgot(value) {
            this.forgot = value
            this.error = null
        },
        async doForgot() {
            this.error = null
            if (!this.auth.email) {
                this.error = 'Please enter an email address.'
                return
            }
            if (this.loading) {
                return
            }
            this.loading = true
            try {
                await this.$http({
                    method: 'POST',
                    url: 'https://dev-rest.highlightportal.com/forgot_password/',
                    data: {
                        email: this.auth.email
                    }
                })
                this.forgotSent = true
                this.loading = false
            } catch (e) {
                this.error = e?.response?.data?.detail || e.message
                this.loading = false
                throw e
            }
        },
        async getToken() {
            if (this.loading) {
                return
            }
            this.loading = true
            try {
                await this.$http({
                    method: 'GET',
                    url: 'https://dev-rest.highlightportal.com/forgot_password/' + this.verificationCode,
                })
                this.token = this.verificationCode
                this.loading = false
            } catch (e) {
                this.loading = false
                this.error = e?.response?.data?.detail || e.message
                throw e
            }
        },
        async savePassword() {
            if ((this.plainPassword || '').length < 8) {
                this.error = 'You must enter a password at least 8 characters long.'
                return
            }
            if (this.loading) {
                return
            }
            this.loading = true
            try {
                await this.$http({
                    method: 'POST',
                    url: 'https://dev-rest.highlightportal.com/forgot_password/' + this.token,
                    data: {
                        password: this.plainPassword
                    }
                })
                this.loading = false
                this.resetForm()
                this.resetSuccess = true
            } catch (e) {
                this.loading = false
                throw e
            }
        }
    },
    mounted() {
        if (this.$refs.email) {
            this.$refs.email.focus()
        }
    }
}
</script>
