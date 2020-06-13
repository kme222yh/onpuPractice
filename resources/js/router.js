window.VueRouter = require('vue-router').default;

Vue.use(VueRouter);

export const router = new VueRouter({
     routes: [
        {path: '/', name: 'root'},
        {path: '/about', name: 'about', component: require('./components/aboutComponent.vue').default},
     ]
 });
