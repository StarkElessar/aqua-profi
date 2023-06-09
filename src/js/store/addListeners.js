import createNewKit from '../helpers/createNewKit';
import kitsCounterLabel from '../helpers/createCounterLabel';
import CustomSelect from '../modules/CustomSelect';
import { kitsContainer, formRent, counterPlaceholder } from '../helpers/elementsNodeList';

const addListeners = (store, size, grow) => {
	const placeholderInit = () => {
		const counter = kitsCounterLabel(store.counter);
		counterPlaceholder.replaceChildren('Итого комплектов: ', counter);
	};
	const initCustomSelects = () => {
		const selects = formRent.querySelectorAll('[data-select]');
		selects.forEach(
			(select) =>
				new CustomSelect(select.dataset.select, {
					onSelected: ({ id, target, name }) => {
						store.dispatch({
							type: 'selectValue',
							kitProps: { id, value: target.dataset.value, name },
						});
					},
				})
		);
	};
	// Событие обновления всех комплектов
	const updateKits = () => {
		const updatedKits = store.allKits.map((kit) =>
			createNewKit({
				kitOptions: kit,
				dispatch: store.dispatch,
				size,
				grow,
			})
		);

		kitsContainer.replaceChildren(...updatedKits);
	};

	store.subscribe(updateKits, initCustomSelects, placeholderInit);
};

export { addListeners };
