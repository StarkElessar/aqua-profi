// Данная функция записывает переданные атрибуты для переданного элемента:
const setAttributes = (element, attributes) => {
  return Object.keys(attributes).forEach((key) =>
    element.setAttribute(key, attributes[key])
  );
};

// Объединяем все свойства элемента в один объект
const setProps = (element, props) => Object.assign(element, props);

// Базовое создание элемента, куда можно передать его тип, атрибуты, детей и остальные свойства
const createElement = ({
  typeElement,
  attributes,
  children = [],
  ...props
}) => {
  const element = document.createElement(typeElement);

  setAttributes(element, attributes);
  setProps(element, props);
  element.append(...children);

  return element;
};

const createLabel = (textLabel) => {
  return createElement({
    typeElement: 'span',
    attributes: {
      class: 'kit-settings__label',
    },
    textContent: textLabel,
  });
};

const createNewComplect = ({ id = '' } = {}) => {
  const removeButton = createElement({
    typeElement: 'button',
    attributes: {
      type: 'button',
    },
    onclick: ({ target }) => {
      console.log(target);
    },
  });
  const buttonWrapper = createElement({
    typeElement: 'div',
    attributes: {
      class: 'kit-settings__remove',
    },
    children: [removeButton],
  });

  const kitSettingsGrow = createElement({
    typeElement: 'div',
    attributes: {
      class: 'kit-settings__grow',
    },
    children: [createLabel('Рост')],
  });
  const kitSettingsSize = createElement({
    typeElement: 'div',
    attributes: {
      class: 'kit-settings__size',
    },
    children: [createLabel('Размер')],
  });

  const buttonMinus = createElement({
    typeElement: 'button',
    attributes: {
      class: 'minus',
      type: 'button',
    },
    onclick: ({ target }) => {
      console.log(target);
    },
  });
  const buttonPlus = createElement({
    typeElement: 'button',
    attributes: {
      class: 'plus',
      type: 'button',
    },
    onclick: ({ target }) => {
      console.log(target);
    },
  });
  const inputAmount = createElement({
    typeElement: 'input',
    attributes: {
      placeholder: '0',
      value: '0',
      type: 'number',
    },
    oninput: ({ target }) => {
      console.log(target);
    },
  });
  const amountControl = createElement({
    typeElement: 'div',
    attributes: {
      class: 'kit-settings__amount-control',
    },
    children: [buttonMinus, inputAmount, buttonPlus],
  });
  const kitSettingsAmount = createElement({
    typeElement: 'div',
    attributes: {
      class: 'kit-settings__amount',
    },
    children: [createLabel('Количество'), amountControl],
  });

  return createElement({
    typeElement: 'li',
    attributes: {
      class: 'kit-settings',
      id: id,
    },
    children: [
      kitSettingsGrow,
      kitSettingsSize,
      kitSettingsAmount,
      buttonWrapper,
    ],
  });
};

export { createNewComplect };