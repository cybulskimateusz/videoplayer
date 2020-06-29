import * as CONSTANTS from '@/constants/sphericalConstants';

export const sphericalState = {
  spherical: false,
  top: false,
  right: false,
  down: false,
  left: false,
};

const sphericalReducer = (state = sphericalState, action) => {
  switch (action.type) {
    case CONSTANTS.SET_SPHERICAL:
      return { ...state, spherical: action.payload };
    case CONSTANTS.SET_TOP:
      return { ...state, top: action.payload };
    case CONSTANTS.SET_RIGHT:
      return { ...state, right: action.payload };
    case CONSTANTS.SET_LEFT:
      return { ...state, left: action.payload };
    case CONSTANTS.SET_DOWN:
      return { ...state, down: action.payload };
    default: return state;
  }
};

export default sphericalReducer;
