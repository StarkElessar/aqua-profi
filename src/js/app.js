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

// import Tabs from 'modules/Tabs';

// import { MousePRLX } from './libs/parallaxMouse'

// import AOS from 'aos'

// import Swiper, { Navigation, Pagination } from 'swiper';

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
 *  Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * И на кнопку, которая вызывает окно так же повешай атрибут data-type="<название окна>"

 * На обертку(враппер) окна добавь класс _overlay-bg
 * На кнопку для закрытия окна добавь класс button-close
 */
// togglePopupWindows();

// const tabs = new Tabs('default-tabs', {});

const toggleSubList = () => {
  document.addEventListener('click', (event) => {
    const { target } = event;
    const activeLinks = document.querySelectorAll(
      '[data-target="sublist"]._active'
    );
    const visibleSublists = document.querySelectorAll('.menu__sublist._open');

    const closeElements = (elements, className) => {
      elements.forEach((element) => element.classList.remove(className));
    };

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
      console.log(1234);
      closeElements(activeLinks, '_active');
      closeElements(visibleSublists, '_open');
    }
  });
};

toggleSubList();