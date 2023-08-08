import {mapState, mapMutations} from 'vuex'

export default {
    computed: {
        ...mapState('userState', {
            savedDataParams: 'dataParams'
        })
    },
    methods: {
        ...mapMutations('userState', ['setDataParams']),
        saveDataParams() {
            this.setDataParams(this.dataParams)
        },
        loadDataParams() {
            this.dataParams = {
                ...(this.savedDataParams || {})
            }
        }
    }
}
