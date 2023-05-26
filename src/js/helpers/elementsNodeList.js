const html = document.documentElement;
const body = document.body;
const pageWrapper = document.querySelector('.page');
const header = document.querySelector('.header');
const firstScreen = document.querySelector('[data-observ]');
const burgerButton = document.querySelector('.icon-menu');
const menu = document.querySelector('.menu');
const lockPaddingElements = document.querySelectorAll('[data-lp]');
const footerMenu = document.querySelector('.footer__body');
const addButton = document.querySelector('.form-rent__add');
const listContainer = document.querySelector('.form-rent__list');
const formRent = document.querySelector('.form-rent');
const kitsContainer = document.querySelector('.form-rent__list');
const counterPlaceholder = formRent.querySelector('.form-rent__bottom > div');

export {
  html,
  body,
  pageWrapper,
  header,
  firstScreen,
  burgerButton,
  menu,
  lockPaddingElements,
  footerMenu,
  addButton,
  listContainer,
  formRent,
  kitsContainer,
  counterPlaceholder,
};