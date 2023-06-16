import { createElement } from './elementFactories';
import customSelect from './createCustomSelect';
import { uuIdV4 } from './randomId.js';

const createLabel = (textLabel) => {
	return createElement({
		typeElement: 'span',
		attributes: {
			class: 'kit-settings__label',
		},
		textContent: textLabel,
	});
};

const createNewKit = ({ kitOptions, dispatch, size, grow }) => {
	const {
		id,
		count = 1,
		selects: { client_grow, client_size },
	} = kitOptions;

	const clientGrowSelect = customSelect({
		selectName: uuIdV4(),
		inputName: 'client_grow',
		inputValue: client_grow,
		options: {
			values: grow,
		},
	});

	const clientSizeSelect = customSelect({
		selectName: uuIdV4(),
		inputName: 'client_size',
		inputValue: client_size,
		options: {
			values: size,
		},
	});

	const removeButton = createElement({
		typeElement: 'button',
		attributes: {
			type: 'button',
			'data-id': id,
		},
		onclick: () => {
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
			name: 'kit_count',
		},
		onchange: ({ target: { value } }) => {
			dispatch({ type: 'inputCounter', kitProps: { count: value, id } });
			dispatch({ type: 'updateCounter' });
		},
	});
	const buttonMinus = createElement({
		typeElement: 'button',
		attributes: {
			class: 'minus',
			type: 'button',
		},
		onclick: () => {
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
		onclick: () => {
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
		children: [kitSettingsGrow, kitSettingsSize, kitSettingsAmount, buttonWrapper],
	});
};

export default createNewKit;
