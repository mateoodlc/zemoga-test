export default class Menu {
  constructor(element, button) {
    this.menuElement = element;
    this.menuOpenButton = button;
    this.setEvents();
    console.log(element);
  }

  toggleMenu() {
    if (this.menuElement.classList.contains('nav-container--opened')) {
      this.menuElement.classList.remove('nav-container--opened');
      this.menuOpenButton.classList.remove('site-header__button--active');
    } else {
      this.menuElement.classList.add('nav-container--opened');
      this.menuOpenButton.classList.add('site-header__button--active');
    }
  }

  setEvents() {
    this.menuOpenButton.addEventListener('click', () => {
      this.toggleMenu();
    });
  }
}
