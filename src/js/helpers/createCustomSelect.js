import { createElement } from './elementFactories';

const customSelect = ({
  selectName,
  inputName,
  options = { values: [] },
  onSelect,
}) => {
  const input = createElement({
    typeElement: 'input',
    attributes: {
      type: 'hidden',
      name: inputName,
    },
  });
  const trigger = createElement({
    typeElement: 'button',
    attributes: {
      class: 'custom-select__trigger',
      'data-type-s': 'trigger',
      type: 'button',
    },
  });

  const items = options.values.map((value) => {
    return createElement({
      typeElement: 'li',
      attributes: {
        class: 'custom-select__option',
        'data-value': value,
      },
      innerText: value,
      onclick: (e) => {
        console.log(e, value);
        onSelect && onSelect(value);
      },
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