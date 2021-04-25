import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { AuthService } from './utils/auth.service'

Vue.config.productionTip = false
Vue.prototype.$authService = new AuthService();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
