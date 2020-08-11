export default class Menu {
  constructor(headerElement, menuElement, button, menuList) {
    this.headerElement = headerElement;
    this.menuElement = menuElement;
    this.menuOpenButton = button;
    this.menuList = menuList;
    this.nodes = [];
    this.setEvents();
    setTimeout(() => {
      this.getFocuseable(headerElement, document);
    }, 1000);
  }

  toggleMenu() {
    if (this.menuElement.classList.contains('nav-container--opened')) {
      this.menuElement.classList.remove('nav-container--opened');
      this.menuOpenButton.classList.remove('site-header__button--active');
      this.menuOpenButton.setAttribute('aria-expanded', 'false');
      this.releaseFocus(this.nodes);
      document.body.style.overflow = 'auto';
    } else {
      this.menuElement.classList.add('nav-container--opened');
      this.menuOpenButton.setAttribute('aria-expanded', 'false');
      this.menuOpenButton.classList.add('site-header__button--active');
      this.trapFocus(this.nodes);
      document.body.style.overflow = 'hidden';
    }
  }

  setEvents() {
    this.menuOpenButton.addEventListener('click', () => {
      this.toggleMenu();
    });
  }

  getFocuseable(focusNode, rootNode = document) {
    // eslint-disable-next-line quotes
    const candidates = 'a, button, input, select, textarea, svg, area, details, summary, iframe, object, embed, [tabindex], [contenteditable]';
    const fucusAbleElements = rootNode.querySelectorAll(candidates);
    const nodes = [];
    for (let i = 0; i < fucusAbleElements.length; i += 1) {
      if (fucusAbleElements !== null) {
        if (!focusNode.contains(fucusAbleElements[i]) && fucusAbleElements[i].getAttribute('tabindex') !== '-1') {
          nodes.push(fucusAbleElements[i]);
        }
      }
    }
    console.log(nodes);
    this.nodes = nodes;
    return nodes;
  }

  // eslint-disable-next-line class-methods-use-this
  trapFocus(nodes) {
    for (let i = 0; i < nodes.length; i += 1) {
      nodes[i].setAttribute('tabindex', '-1');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  releaseFocus(nodes) {
    for (let i = 0; i < nodes.length; i += 1) {
      nodes[i].removeAttribute('tabindex');
    }
  }
}
