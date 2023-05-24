/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый (не вызванный) код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
import {
  isWebp,
  headerFixed,
  togglePopupWindows,
  addTouchClass,
  addLoadedClass,
} from './modules';

import BurgerMenu from './modules/BurgerMenu';
import initMap from './modules/yandexMapLoad.js';
import { footerMenu } from './helpers/elementsNodeList.js';

import Tabs from './modules/Tabs';

// import { MousePRLX } from './libs/parallaxMouse'

// import AOS from 'aos'

import Swiper, { Thumbs } from 'swiper';
import CustomSelect from './modules/CustomSelect.js';
import { createNewComplect } from './helpers/elementFactories.js';

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML
 ! (i) необходимо для корректного отображения webp из css
 */
isWebp();

/* Добавление класса touch для HTML если браузер мобильный */
// addTouchClass();

/* Добавление loaded для HTML после полной загрузки страницы */
// addLoadedClass();

/* Модуль для работы с меню (Бургер) */
new BurgerMenu().init();

/**
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 */
// AOS.init();

/** Параллакс мышей */
// const mousePrlx = new MousePRLX({});

/** Фиксированный header */
// headerFixed();

/**
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * И на кнопку, которая вызывает окно так же повешай атрибут data-type="<название окна>"

 * На обертку(враппер) окна добавь класс _overlay-bg
 * На кнопку для закрытия окна добавь класс button-close
 */
// togglePopupWindows();

const allSelects = document.querySelectorAll('[data-select]');

for (const select of allSelects) {
  console.log(select);
  new CustomSelect(select.dataset.select);
}

const addNewComplect = () => {
  const addButton = document.querySelector('.form-rent__add');
  const listContainer = document.querySelector('.form-rent__list');

  addButton.addEventListener('click', (e) => {
    const newItem = createNewComplect();

    listContainer.append(newItem);
  });
};

addNewComplect();

if (document.querySelector('[data-tabs="catalog"]')) {
  const category = [
    '#antistaticheskaya',
    '#ognestojkaya',
    '#pishchevaya',
    '#letnyaya',
    '#uteplyonnaya',
  ];

  const categoryId = category.indexOf(location.hash);
  const tabId = categoryId < 0 ? 0 : categoryId;

  new Tabs('catalog', {
    defaultTab: tabId,
    onChanged: ({ nextTab }) => (location.hash = nextTab.dataset.category),
    onHashChange: ({ data, eventObject: { newURL } }) => {
      const currentHash = newURL.split('#')[1];
      data.triggers.forEach((trigger) => {
        trigger.dataset.category === currentHash ? trigger.click() : null;
      });
    },
  });
}

const setClassCollapsable = () => {
  footerMenu.classList.toggle('collapsable', innerWidth <= 510);
};

const toggleSubList = () => {
  const closeElements = (elements, className) => {
    elements.forEach((element) => element.classList.remove(className));
  };

  document.addEventListener('click', (event) => {
    const { target } = event;
    const activeLinks = document.querySelectorAll(
      '[data-target="sublist"]._active'
    );
    const visibleSublists = document.querySelectorAll('.menu__sublist._open');

    if (target.closest('[data-target="sublist"]')) {
      event.preventDefault();
      const currentLink = target.closest('[data-target="sublist"]');

      if (!currentLink.classList.contains('_active')) {
        closeElements(activeLinks, '_active');
        closeElements(visibleSublists, '_open');

        currentLink.classList.add('_active');
        currentLink.nextElementSibling.classList.add('_open');
      } else {
        currentLink.classList.remove('_active');
        currentLink.nextElementSibling.classList.remove('_open');
      }
    }

    if (
      !target.closest('.menu__sublist._open') &&
      !target.closest('[data-target="sublist"]') &&
      activeLinks.length
    ) {
      closeElements(activeLinks, '_active');
      closeElements(visibleSublists, '_open');
    }
  });
};

const footerMenuCollapsable = ({ target }) => {
  if (footerMenu.classList.contains('collapsable')) {
    const trigger = target.closest('.column-footer__title');

    if (trigger) {
      if (!trigger.parentElement.classList.contains('open')) {
        footerMenu
          .querySelector('.column-footer.open')
          ?.classList.remove('open');
      }

      trigger.parentElement.classList.toggle('open');
    }
  }
};

toggleSubList();
setClassCollapsable();

if (document.querySelector('.product-slider')) {
  const thumbsSwiper = new Swiper('.product-slider__thumbs', {
    direction: 'vertical',
    spaceBetween: 10,
    slidesPerView: 3,
    watchSlidesProgress: true,
  });

  new Swiper('.product-slider__main', {
    modules: [Thumbs],
    spaceBetween: 10,
    thumbs: {
      swiper: thumbsSwiper,
    },
  });
}

if (document.getElementById('map-yandex')) {
  initMap();
}

document.addEventListener('click', footerMenuCollapsable);

window.addEventListener('resize', () => {
  setClassCollapsable();

  if (footerMenu.classList.contains('collapsable')) {
    document.addEventListener('click', footerMenuCollapsable);
  } else {
    document.removeEventListener('click', footerMenuCollapsable);
  }
});