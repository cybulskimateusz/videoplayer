import SET_HOTSPOTS from '@/constants/hotspotsConstants';

export const hotspotsState = {
  hotspots: [],
};

const hotspotsReducer = (state = hotspotsState, action) => {
  switch (action.type) {
    case SET_HOTSPOTS:
      return action.payload;
    default: return state;
  }
};

export default hotspotsReducer;
