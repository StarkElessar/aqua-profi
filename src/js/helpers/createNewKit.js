import { createElement } from './elementFactories';
import customSelect from './createCustomSelect';

export const handleButtonDisabledState = (button, input) => {
  button.disabled = input.value <= '1';
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

const createNewKit = ({ kitOptions: { id, count = 1 }, dispatch }) => {
  const clientGrowSelect = customSelect({
    selectName: crypto.randomUUID(),
    inputName: 'client_grow',
    options: {
      values: ['170-176', '182-188'],
    },
    onSelect: () => dispatch({ type: 'selectValue', kitProps: { id } }),
  });

  const clientSizeSelect = customSelect({
    selectName: crypto.randomUUID(),
    inputName: 'client_size',
    options: {
      values: ['44-46', '48-50', '52-54', '56-58', '60-62'],
    },
  });

  const removeButton = createElement({
    typeElement: 'button',
    attributes: {
      type: 'button',
      'data-id': id,
    },
    onclick: ({ target }) => {
      dispatch({ type: 'removeKit', kitProps: { id } });
      dispatch({ type: 'updateCounter' });
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
    children: [createLabel('Рост'), clientGrowSelect],
  });
  const kitSettingsSize = createElement({
    typeElement: 'div',
    attributes: {
      class: 'kit-settings__size',
    },
    children: [createLabel('Размер'), clientSizeSelect],
  });

  const inputAmount = createElement({
    typeElement: 'input',
    attributes: {
      placeholder: '0',
      value: count,
      type: 'number',
    },
    oninput: ({ target }) => {
      console.log(target);
    },
  });
  const buttonMinus = createElement({
    typeElement: 'button',
    attributes: {
      class: 'minus',
      type: 'button',
    },
    onclick: ({ target }) => {
      dispatch({ type: 'counterDec', kitProps: { id } });
      dispatch({ type: 'updateCounter' });
    },
  });
  const buttonPlus = createElement({
    typeElement: 'button',
    attributes: {
      class: 'plus',
      type: 'button',
    },
    onclick: ({ target }) => {
      dispatch({ type: 'counterInc', kitProps: { id } });
      dispatch({ type: 'updateCounter' });
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
      id,
    },
    children: [
      kitSettingsGrow,
      kitSettingsSize,
      kitSettingsAmount,
      buttonWrapper,
    ],
  });
};

export default createNewKit;