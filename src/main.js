// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import objectAssign from 'object-assign'

import Vue from 'vue'
import FastClick from 'fastclick'

import App from './App'
import router from './router'
import vuexI18n from 'vuex-i18n'
import Vuex from 'vuex';

import store from './store'

import vuxLocales from './locales/all.yml'
import componentsLocales from './locales/components.yml'





Vue.use(Vuex)

/** i18n **/
let store2 = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})
Vue.use(vuexI18n.plugin, store2);

const finalLocales = {
  'en': objectAssign(vuxLocales['en'], componentsLocales['en']),
  'zh-CN': objectAssign(vuxLocales['zh-CN'], componentsLocales['zh-CN'])
}

for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i])
}

import { LocalePlugin, AjaxPlugin, AlertPlugin } from "vux"
Vue.use(LocalePlugin)
Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)


// FOR TEST ONLY
AjaxPlugin.$http.defaults.baseURL = 'http://localhost:3000'


const nowLocale = Vue.locale.get()
if (/zh/.test(nowLocale)) {
  Vue.i18n.set('zh-CN')
} else {
  Vue.i18n.set('en')
}


FastClick.attach(document.body)



Vue.config.productionTip = false


const init = () => {
    /* eslint-disable no-new */
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app-box')
};
  
  // Wait for the deviceready event to start the render
document.addEventListener("deviceready", () => {
    // eslint-disable-next-line
    console.log("Ready, Render the App");
    init();
});

// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = (typeof window.cordova !== "undefined");
if (!isCordovaApp){
    document.dispatchEvent(new CustomEvent("deviceready", {}));
}