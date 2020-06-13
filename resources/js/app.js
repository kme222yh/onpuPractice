/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.Tone = require('Tone');

const router = require('./router').router;
const store = require('./store').store;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('menu-background-component', require('./components/MenuBackgroundComponent.vue').default);
Vue.component('top-menu-component', require('./components/menu/TopComponent.vue').default);
Vue.component('app-menu-component', require('./components/menu/AppComponent.vue').default);
Vue.component('score-component', require('./components/score/ScoreComponent.vue').default);
Vue.component('opening-component', require('./components/OpeningAnimationComponent.vue').default);
Vue.component('setting-component', require('./components/SettingComponent.vue').default);
Vue.component('message-component', require('./components/MessageComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router: router,
    store,
});
