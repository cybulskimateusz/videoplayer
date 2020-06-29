import * as actions from '@/constants/sphericalConstants';

export const setSpherical = (payload) => ({
  type: actions.SET_SPHERICAL,
  payload,
});

export const setRight = (payload) => ({
  type: actions.SET_RIGHT,
  payload,
});

export const setLeft = (payload) => ({
  type: actions.SET_LEFT,
  payload,
});

export const setTop = (payload) => ({
  type: actions.SET_TOP,
  payload,
});

export const setDown = (payload) => ({
  type: actions.SET_DOWN,
  payload,
});
