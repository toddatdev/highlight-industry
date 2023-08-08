import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa'
  },
  theme: {
    themes: {
      light: {
        primary: '#20a8d8',
        secondary: '#2ca58d'
      },
      dark: {
        primary: '#20a8d8',
        secondary: '#2ca58d'
      }
    }
  }
})
