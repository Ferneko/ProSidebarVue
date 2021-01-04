import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Layout from './Layout.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Breadcrumb from 'primevue/breadcrumb';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'moment'

Vue.config.productionTip = false
Vue.component("Breadcrumb",Breadcrumb)
Vue.component("Layout", Layout)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});

Vue.filter('doubleToDate', function(value) {
  if (value) {
    var date = new Date(value * 1000);
    return moment(value).format('hh:mm')
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
