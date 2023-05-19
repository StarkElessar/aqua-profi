import Popup from './Popup.js';

class BurgerMenu extends Popup {
  constructor() {
    super();

    this.burgerButton = document.querySelector('.icon-menu');
  }

  /**
   * Initialize the menu functionality.
   */
  init() {
    if (this.burgerButton) {
      document.addEventListener('click', ({ target }) => {
        if (target.closest('.icon-menu')) {
          this.html.classList.toggle('menu-open');
          this.toggleBodyLock(this.html.classList.contains('menu-open'));
        } else if (!target.closest('.menu') && !target.closest('.icon-menu')) {
          this.html.classList.remove('menu-open')
          this.body.classList.remove('lock')
          this.body.style.paddingRight = 0
          const header = document.querySelector('.header')
          header.style.paddingRight = 0
        }
      });
      document.addEventListener('keyup', e => {
        e.code === 'Escape' && this.html.classList.remove('menu-open');
        this.body.classList.remove('lock');
      });
    }
  }

  /**
   * Open the menu.
   */
  menuOpen() {
    this.toggleBodyLock(true);
    this.html.classList.add('menu-open');
  }

  /**
   * Close the menu.
   */
  menuClose() {
    this.toggleBodyLock(false);
    this.html.classList.remove('menu-open');
  }
}

export default BurgerMenu;