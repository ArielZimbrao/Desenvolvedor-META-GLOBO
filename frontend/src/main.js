import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { RequestService } from './utils/request.service'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueToast);
Vue.config.productionTip = false
Vue.prototype.$requestService = new RequestService();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
