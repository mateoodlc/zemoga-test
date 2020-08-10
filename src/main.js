import Vue from 'vue';
import App from './App.vue';
import Menu from './Menu';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

const menuElement = document.querySelector('.nav-container');
const menuButton = document.querySelector('.site-header__button');
if (menuElement && menuButton) {
  // eslint-disable-next-line no-new
  new Menu(menuElement, menuButton);
}
