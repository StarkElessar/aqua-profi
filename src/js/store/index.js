import { reducer } from './reducer';

const createStore = () => {
  const listeners = [];
  let state;

  const executeAll = (listeners) => listeners.forEach((listener) => listener());

  const dispatch = (action) => {
    state = reducer(state, action);
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