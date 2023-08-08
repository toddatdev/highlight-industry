import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './registerServiceWorker'
import MainToolbar from '@/components/MainToolbar'
import vuetify from '@/lib/vuetify'
import '@fortawesome/fontawesome-free/css/all.css'
import {mapGetters} from 'vuex'
import unitName from '@/lib/unitName'
import '@/assets/styles.scss'

Vue.config.productionTip = false

Vue.mixin({
    components: {
        MainToolbar
    },
    computed: {
        appSmall() {
            return this.$vuetify.breakpoint.smAndDown
        },
        ...mapGetters(['readOnly', 'userRole'])
    },
    methods: {
        unitName(key) {
            return unitName(key)
        }
    }
})

// router.onReady(() => {
//   store.dispatch('rootBootstrap')
// })

const run = async () => {
    // Get current authentication state
    await store.dispatch('rootBootstrap')

    new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
    }).$mount('#app')
}

run()
