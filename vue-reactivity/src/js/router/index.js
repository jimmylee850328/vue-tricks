import Vue from 'vue'
import Router from 'vue-router'
import Example1 from '@/components/example-1.vue';
import Example2 from '@/components/example-2.vue';

Vue.use(Router)

export default new Router({
    mode: 'history',
    //base: "/bash_path/",   // 網址有階層結構時，要加上的路徑
    routes: [
        {
            path: '/',
            name: 'Example-1',
            component: Example1
        },
        {
            path: '/Example-1',
            name: 'Example-1',
            component: Example1
        },
        {
            path: '/Example-2',
            name: 'Example-2',
            component: Example2
        },
    ],
})