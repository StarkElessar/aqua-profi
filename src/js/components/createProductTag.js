import { createElement } from '../helpers/elementFactories';

const createProductTag = (text) => {
	return createElement({
		typeElement: 'li',
		attributes: {
			class: 'product-tag__item',
		},
		textContent: text,
	});
};

export default createProductTag;
