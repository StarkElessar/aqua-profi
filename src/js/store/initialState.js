const initialState = {
  kitsCounter: 1,
  kits: [
    {
      id: crypto.randomUUID(),
      count: 1,
      selects: {
        client_size: '46-46',
        client_grow: '170-176',
      },
    },
  ],
};

export { initialState };