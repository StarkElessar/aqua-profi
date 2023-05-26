import { initialState } from './initialState';

const reducer = (state = initialState, { type = 'default', kitProps }) => {
  const actions = {
    addKit: () => ({
      ...state,
      kits: state.kits.concat([
        {
          id: crypto.randomUUID(),
          count: 1,
          selects: {
            client_grow: '170-176',
            client_size: '44-46',
          },
        },
      ]),
    }),

    removeKit: () => ({
      ...state,
      kits: state.kits.filter((kit) => kit.id !== kitProps.id),
    }),

    counterInc: () => ({
      ...state,
      kits: state.kits.map((kit) =>
        kit.id === kitProps.id ? { ...kit, count: kit.count + 1 } : kit
      ),
    }),

    counterDec: () => {
      const updatedKits = state.kits.map((kit) =>
        kit.id === kitProps.id
          ? { ...kit, count: Math.max(kit.count - 1, 0) }
          : kit
      );

      return updatedKits.find((kit) => kit.id === kitProps.id && kit.count < 1)
        ? actions.removeKit()
        : { ...state, kits: updatedKits };
    },

    updateCounter: () => ({
      ...state,
      kitsCounter: state.kits.reduce(
        (accumulator, kit) => accumulator + kit.count,
        0
      ),
    }),

    selectValue: () => {
      const updatedKits = state.kits.map((kit) => {
        if (kit.id === kitProps.id) {
          return {
            ...kit,
            selects: {
              ...kit.selects,
              [kitProps.name]: kitProps.value,
            },
          };
        }
        return kit;
      });

      return {
        ...state,
        kits: updatedKits,
      };
    },

    default: () => state,
  };

  return actions[type]();
};

export { reducer };