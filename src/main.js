import Vue from 'vue'
import App from './App.vue'
import Loader from './components/Loader'
import router from './router'
import Layout from './Layout.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Breadcrumb from 'primevue/breadcrumb';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'moment'

Vue.config.productionTip = false
Vue.component("Breadcrumb", Breadcrumb)
Vue.component("Layout", Layout)
Vue.component("Loader", Loader)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});

Vue.filter('doubleToDate', function (value) {
  if (value) {
    var date = new Date(value * 1000);
    return moment(value).format('hh:mm')
  }
});

const MyPlugin = {
  install(Vue, options) {
    Vue.prototype.TemAutorizacao = (role) => {
      //console.log(sessionStorage.getItem(role)+" teste");
      if (sessionStorage.getItem(role) === null) {
        //console.log("Não tem role");
        return false;

      } else {
        if (sessionStorage.getItem(role) == role) {
          //console.log("Tem Role")
          return true;
        } else {
          return false;
        }
      }
    }
  },
}
Vue.use(MyPlugin)



new Vue({
  router,
  data() {
    return {
      loading: {
        val:false
      },
    }
  },
  provide(){
    return { Loading: this.loading }
  },
  render: h => h(App),
  methods: {
    ativarLoader() {
    
      //this.loading.val = true
     
    },
    desativarLoader() {
      //setTimeout( ()=> {  this.loading.val = false }, 8000)
     
     
    }
  }
}).$mount('#app')
