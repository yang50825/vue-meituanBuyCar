import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.filter('toFixedTwo', (val) => val.toFixed(2))
new Vue({
  render: (h) => h(App),
}).$mount('#app')
