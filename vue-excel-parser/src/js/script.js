//import Vue from "vue"

import Vue from 'vue';
import vuetify from "./plugins/vuetify.js";
import store from './store/store.js'
import router from './router'

import App from "./App.vue";

Vue.directive("focus", {
    inserted: function(el) {
        el.focus();
    },
});

Vue.directive("visible", {
    bind: (el, binding) => {
        el.style.opacity = binding.value ? 1 : 0;
    },
    update: (el, binding) => {
        el.style.opacity = binding.value ? 1 : 0;
    },
});


const opts = {
    theme: {
        dark: false,
        themes: {
            
        },
    },
};

new Vue({
    vuetify,
    el: "#app",
    store,
    router,
    render: h => h(App),
});
