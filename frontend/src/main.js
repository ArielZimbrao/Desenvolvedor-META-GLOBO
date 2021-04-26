import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { RequestService } from './utils/request.service'
import VueToast from 'vue-toast-notification';
import * as store from './views/store'
import VueApexCharts from 'vue-apexcharts'
import vSelect from 'vue-select'

import 'vue-toast-notification/dist/theme-sugar.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(store)
Vue.use(VueToast);
Vue.use(VueApexCharts)

Vue.component('v-select', vSelect)
Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$requestService = new RequestService();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
