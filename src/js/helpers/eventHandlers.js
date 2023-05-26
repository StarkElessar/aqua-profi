import createNewKit from './createNewKit';

const handleAddKitButtonClick = (store) => () => {
  store.dispatch({ type: 'addKit' });
  store.dispatch({ type: 'updateCounter' });
};

export { handleAddKitButtonClick };