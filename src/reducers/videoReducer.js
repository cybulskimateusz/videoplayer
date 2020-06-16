import * as constants from '@/constants/videoConstants';

export const videoState = {
  isPlayed: false,
  canPlay: false,
};

const videoReducer = (state = videoState, action) => {
  switch (action.type) {
    case constants.SWITCH_IS_PLAYED:
      return { ...state, isPlayed: !state.isPlayed };
    default: return state;
  }
};

export default videoReducer;
