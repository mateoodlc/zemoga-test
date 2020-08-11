import Vue from 'vue';
import App from './App.vue';
import Menu from './Menu';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

const menuElement = document.querySelector('.nav-container');
const menuButton = document.querySelector('.site-header__button');
const menuList = document.querySelector('.nav-list__wrapper');
if (menuElement && menuButton && menuList) {
  // eslint-disable-next-line no-new
  new Menu(menuElement, menuButton, menuList);
}
