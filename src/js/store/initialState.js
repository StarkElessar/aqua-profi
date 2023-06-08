import { uuIdV4 } from '../helpers/randomId.js';

const initialState = {
  kitsCounter: 1,
  kits: [
    {
      id: uuIdV4(),
      count: 1,
      selects: {
        client_size: '44-46',
        client_grow: '170-176',
      },
    },
  ],
};

export { initialState };
