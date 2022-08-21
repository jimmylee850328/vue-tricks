import Vue from 'vue'
import Router from 'vue-router'
import ExcelParser from '@/components/excel-parser.vue';

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            name: 'ExcelParser',
            component: ExcelParser
        }
    ],
})