import Vue from 'vue';
import Router from 'vue-router';

const Home = resolve => require(['@/views/Home.vue'], resolve);
const About = resolve => require(['@/views/About.vue'], resolve);

Vue.use(Router);

let routes =  [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: About
    }
];


const router = new Router({
	mode: 'history',       // 需要后台配置支持
	routes
});

router.beforeEach((to, from, next) => {
	next();
});

export default router;