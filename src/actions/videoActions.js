import * as CONSTANTS from '@/constants/videoConstants';

export const switchIsPlayed = () => ({
  type: CONSTANTS.SWITCH_IS_PLAYED,
});

export const setIsPlayed = (payload) => ({
  type: CONSTANTS.SET_IS_PLAYED,
  payload,
});

export const setCurrentTime = (payload) => ({
  type: CONSTANTS.SET_CURRENT_TIME,
  payload,
});

export const setIsSeeked = (payload) => ({
  type: CONSTANTS.SET_IS_SEEKED,
  payload,
});

export const setSeekedTime = (payload) => ({
  type: CONSTANTS.SET_SEEKED_TIME,
  payload,
});

export const setDuration = (payload) => ({
  type: CONSTANTS.SET_DURATION,
  payload,
});
