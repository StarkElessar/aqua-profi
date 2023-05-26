import { createElement } from './elementFactories';

const customSelect = ({
  selectName,
  inputName,
  inputValue,
  options = { values: [] },
}) => {
  const input = createElement({
    typeElement: 'input',
    attributes: {
      type: 'hidden',
      name: inputName,
      value: inputValue,
    },
  });
  const trigger = createElement({
    typeElement: 'button',
    attributes: {
      class: 'custom-select__trigger',
      'data-type-s': 'trigger',
      type: 'button',
    },
    textContent: inputValue,
  });

  const items = options.values.map((value) => {
    const isSelected = value === inputValue;
    const className = `custom-select__option ${isSelected ? 'selected' : ''}`;

    return createElement({
      typeElement: 'li',
      attributes: {
        class: className,
        'data-value': value,
      },
      innerText: value,
    });
  });

  const listContainer = createElement({
    typeElement: 'ul',
    attributes: {
      class: 'custom-select__list',
      'data-type-s': 'list',
    },
    children: items,
  });

  return createElement({
    typeElement: 'div',
    attributes: {
      class: 'custom-select',
      'data-select': selectName,
    },
    children: [input, trigger, listContainer],
  });
};

export default customSelect;