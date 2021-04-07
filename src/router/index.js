import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: localStorage.getItem('values') === null ? '/edit' : '/result'
    },
    {
        path: '/edit',
        component: () => import('../pages/edit')
    },
    {
        path: '/result',
        component: () => import('../pages/result'),
    }, {
        path: '/notify',
        component: () => import('../pages/notify')
    }
];

const routers = new VueRouter({
    routes
});


export default routers;