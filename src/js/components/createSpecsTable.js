import { createElement } from '../helpers/elementFactories';

export const tableRow = (key, value) => {
	return createElement({
		typeElement: 'tr',
		attributes: { class: 'table-specs__row' },
		innerHTML: `
			<td class="table-specs__category">${key}</td>
			<td class="table-specs__value">${value}</td>
		`,
	});
};

const createSpecsTable = (title, specs) => {
	const titleRow = createElement({
		typeElement: 'tr',
		attributes: { class: 'table-specs__sub-title' },
		innerHTML: `<td>${title}</td>`,
	});

	const rows = Object.keys(specs).map((key) => tableRow(key, specs[key]));

	return createElement({
		typeElement: 'tbody',
		attributes: {
			class: 'table-specs__body',
		},
		children: [titleRow, ...rows],
	});
};

export default createSpecsTable;
