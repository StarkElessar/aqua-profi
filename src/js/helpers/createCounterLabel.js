import { createElement } from './elementFactories';

const kitsCounterLabel = (kitsCounter) => {
  return createElement({
    typeElement: 'span',
    attributes: {
      id: 'kits-number',
    },
    textContent: kitsCounter,
  });
};

export default kitsCounterLabel;