class CustomSelect {
  constructor(selector, options = {}) {
    const defaultOptions = {
      selectName: selector,
      defaultSelected: 0,
      activeClass: 'active',
      selectedClass: 'selected',
      autoCollapse: true,
      onSelected: () => {},
    };

    this.options = Object.assign(defaultOptions, options);
    this.selector = selector;
    this.select = document.querySelector(`[data-select="${selector}"]`);

    if (this.select) {
      this.input = this.select.querySelector('input[type="hidden"]');
      this.trigger = this.select.querySelector('[data-type-s="trigger"]');
      this.selectList = this.select.querySelector('[data-type-s="list"]');
      this.items = this.selectList.querySelectorAll('[data-value]');

      this.#init();
      this.#events();
    }
  }

  #init() {
    const selectedItem = this.items[this.options.defaultSelected];

    this.trigger.setAttribute('aria-label', 'true');
    this.trigger.setAttribute('aria-expanded', 'false');

    this.trigger.innerText = selectedItem.dataset.value;
    this.input.value = selectedItem.dataset.value;
    selectedItem.classList.add(this.options.selectedClass);
  }

  #events() {
    document.addEventListener('click', ({ target }) => {
      if (target.closest(`[data-select="${this.selector}"]`)) {
        if (target === this.trigger) {
          this.toggle();
        }

        if (target.closest('[data-value]')) {
          this.trigger.innerText = target.dataset.value;
          this.input.value = target.dataset.value;

          this.selectList
            .querySelector(`.${this.options.selectedClass}`)
            ?.classList.remove(this.options.selectedClass);

          target.classList.add(this.options.selectedClass);

          if (this.options.autoCollapse) {
            this.close();
          }

          this.options.onSelected({
            target,
            id: target.closest('.kit-settings').id,
            name: this.input.name,
          });
        }
      } else {
        if (this.isOpen) this.close();
      }
    });

    document.addEventListener('keydown', ({ code }) => {
      if (this.isOpen && code === 'Escape') {
        this.close();
      }
    });

    this.select.addEventListener('focusout', (event) => {
      //this.close();
    });
  }

  open() {
    this.select.classList.add(this.options.activeClass);
    this.trigger.setAttribute('aria-expanded', 'true');
  }

  close() {
    this.select.classList.remove(this.options.activeClass);
    this.trigger.setAttribute('aria-expanded', 'false');
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  get isOpen() {
    return this.select.classList.contains(this.options.activeClass);
  }
}

export default CustomSelect;