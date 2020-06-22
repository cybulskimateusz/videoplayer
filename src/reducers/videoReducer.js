import * as constants from '@/constants/videoConstants';

export const videoState = {
  isPlayed: false,
  currentTime: 0,
  seekedTime: 0,
  isSeeked: false,
};

const videoReducer = (state = videoState, action) => {
  switch (action.type) {
    case constants.SWITCH_IS_PLAYED:
      return { ...state, isPlayed: !state.isPlayed };
    case constants.SET_IS_PLAYED:
      return { ...state, isPlayed: action.payload };
    case constants.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case constants.SET_IS_SEEKED:
      return { ...state, isSeeked: action.payload };
    case constants.SET_SEEKED_TIME:
      return { ...state, seekedTime: action.payload };
    case constants.SET_DURATION:
      return { ...state, duration: action.payload };
    default: return state;
  }
};

export default videoReducer;
