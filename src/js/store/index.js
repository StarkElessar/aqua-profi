import { reducer } from './reducer';
import { uuIdV4 } from '../helpers/randomId.js';

const createStore = (defaultSize, defaultGrow) => {
	const listeners = [];
	let state = {
		kitsCounter: 1,
		kits: [
			{
				id: uuIdV4(),
				count: 1,
				selects: {
					client_size: defaultSize,
					client_grow: defaultGrow,
				},
			},
		],
	};

	const executeAll = (listeners) => listeners.forEach((listener) => listener());

	const dispatch = (action) => {
		state = reducer(state, action, defaultSize, defaultGrow);
		executeAll(listeners);
	};

	const subscribe = (...listenersToSubscribe) => {
		listeners.push(...listenersToSubscribe);
		executeAll(listeners);
	};

	dispatch({});

	return {
		get counter() {
			return state.kitsCounter;
		},
		get allKits() {
			return state.kits;
		},
		dispatch,
		subscribe,
	};
};

export { createStore };
