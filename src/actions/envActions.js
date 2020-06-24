import * as CONSTANTS from '@/constants/envConstants';

export const setSrc = (payload) => ({
  type: CONSTANTS.SET_SRC,
  payload,
});

export const setHotspots = (payload) => ({
  type: CONSTANTS.SET_HOTSPOTS,
  payload,
});
