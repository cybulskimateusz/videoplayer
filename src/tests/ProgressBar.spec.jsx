import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, cleanup } from '@testing-library/react';

import { videoState } from '@/reducers/videoReducer';
import { setSeekedTime, setIsSeeked } from '@/actions/videoActions';
import ProgressBar from '@/components/ProgressBar/ProgressBar';

const mockStore = configureStore([]);
const basicStore = mockStore({ videoReducer: videoState });

describe('<ProgressBar /> ', () => {
  beforeEach(() => {
    jest.mock('react-redux', () => ({ useSelector: jest.fn() }));
    basicStore.dispatch = jest.fn();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should get value from store currentTime on isDetecting false', () => {
    const state = mockStore({
      videoReducer: { ...videoState, currentTime: 30, duration: 100 },
    });
    const { container } = render(
      <Provider store={state}>
        <ProgressBar isDetecting={false} />
      </Provider>,
    );
    const progress = container.querySelector('.progress_bar');
    expect(progress.getAttribute('value')).toEqual('30');
  });

  test('should get value from coordinates on isDetecting true', () => {
    const state = mockStore({
      videoReducer: { ...videoState, currentTime: 30, duration: 100 },
    });
    const coordinates = { percent: { x: 20 } };
    const { container } = render(
      <Provider store={state}>
        <ProgressBar isDetecting coordinates={coordinates} />
      </Provider>,
    );
    const progress = container.querySelector('.progress_bar');
    expect(progress.getAttribute('value')).toEqual('20');
  });

  test('should dispatch time from coordinates if isDetecting', () => {
    const state = mockStore({
      videoReducer: { ...videoState, duration: 100 },
    });
    state.dispatch = jest.fn();
    const coordinates = { percent: { x: 20 } };
    render(
      <Provider store={state}>
        <ProgressBar isDetecting coordinates={coordinates} />
      </Provider>,
    );
    expect(state.dispatch).toHaveBeenCalledWith(setSeekedTime(20));
  });

  test('should dispatch isSeeked true if isDetecting is false', () => {
    const state = mockStore({
      videoReducer: { ...videoState, duration: 100 },
    });
    state.dispatch = jest.fn();
    const coordinates = { percent: { x: 20 } };
    render(
      <Provider store={state}>
        <ProgressBar isDetecting={false} coordinates={coordinates} />
      </Provider>,
    );
    expect(state.dispatch).toHaveBeenCalledWith(setIsSeeked(true));
  });
});
