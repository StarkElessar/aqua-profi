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
        }

        if (
          target === this.body &&
          !target.closest('.menu') &&
          !target.closest('.icon-menu')
        ) {
          this.menuClose();
          this.toggleBodyLock(this.html.classList.contains('menu-open'));
        }
      });

      document.addEventListener('keyup', ({ code }) => {
        if (this.isMenuOpen && code === 'Escape') {
          this.menuClose();
        }
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

  /**
   * Check if the menu is open.
   * @returns {boolean} True if the menu is open, false otherwise.
   */
  get isMenuOpen() {
    return this.html.classList.contains('menu-open');
  }
}

export default BurgerMenu;