import * as CONSTANTS from '@/constants/envConstants';

export const envState = {
  src: '',
  hotspots: [],
};

const envReducer = (state = envState, action) => {
  switch (action.type) {
    case CONSTANTS.SET_SRC:
      return { ...state, src: action.payload };
    case CONSTANTS.SET_HOTSPOTS:
      return { ...state, hotspots: action.payload };
    default: return state;
  }
};

export default envReducer;
