//import Vue from "vue"

import Vue from 'vue';
import vuetify from "./plugins/vuetify.js";
import colors from 'vuetify/lib/util/colors'
import store from './store/store.js'
import router from './router'

import App from "./App.vue";

// full import
import * as XLSX from 'xlsx';

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
            light: {
                primary: "#197AC8",
                secondary: "#d9dce2",
                accent: "#8c9eff",
                error: "#b71c1c",
            },
            // light: {
            //     main_color: colors.blue.darken2,
            //     main_color_alt: colors.yellow.darken2,
            //     secondary_color: colors.lightBlue.lighten1,
            //     assist_color: colors.lightBlue.lighten5,
            //     assist_color_alt: colors.orange.lighten5,
            //     accent_color: colors.indigo.base, // #3F51B5
            //     accent_color_alt: colors.pink.lighten1,
            //     confirm_color: colors.green.lighten1,
            //     reject_color: colors.red.darken2,
            //     color_light: colors.grey.lighten5,
            //     color_dark: colors.blueGrey.darken4,
            //     color_disabled: colors.grey.darken1
            //   }
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
