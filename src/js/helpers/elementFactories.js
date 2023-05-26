// Данная функция записывает переданные атрибуты для переданного элемента:
export const setAttributes = (element, attributes) => {
  return Object.keys(attributes).forEach((key) =>
    element.setAttribute(key, attributes[key])
  );
};

// Объединяем все свойства элемента в один объект
export const setProps = (element, props) => Object.assign(element, props);

// Базовое создание элемента, куда можно передать его тип, атрибуты, детей и остальные свойства
export const createElement = ({
  typeElement,
  attributes = {},
  children = [],
  ...props
}) => {
  const element = document.createElement(typeElement);

  setAttributes(element, attributes);
  setProps(element, props);
  element.append(...children);

  return element;
};