export default class Menu {
  constructor(element, button, menuList) {
    this.menuElement = element;
    this.menuOpenButton = button;
    this.menuList = menuList;
    this.setEvents();
  }

  toggleMenu() {
    if (this.menuElement.classList.contains('nav-container--opened')) {
      this.menuElement.classList.remove('nav-container--opened');
      this.menuOpenButton.classList.remove('site-header__button--active');
      this.menuOpenButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = 'auto';
    } else {
      this.menuElement.classList.add('nav-container--opened');
      this.menuOpenButton.setAttribute('aria-expanded', 'false');
      this.menuOpenButton.classList.add('site-header__button--active');
      document.body.style.overflow = 'hidden';
    }
  }

  setEvents() {
    this.menuOpenButton.addEventListener('click', () => {
      this.toggleMenu();
    });
  }
}
