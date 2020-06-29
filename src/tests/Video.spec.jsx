import React from 'react';
import { fireEvent, createEvent } from '@testing-library/dom';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { videoState } from '@/reducers/videoReducer';
import { envState } from '@/reducers/envReducer';
import { setDuration, setCurrentTime, setIsSeeked } from '@/actions/videoActions';
import Video from '@/components/Video';

const pauseStub = jest
  .spyOn(window.HTMLMediaElement.prototype, 'pause')
  .mockImplementation(() => {});
const playStub = jest
  .spyOn(window.HTMLMediaElement.prototype, 'play')
  .mockImplementation(() => {});
const mockStore = configureStore([]);
const basicStore = mockStore({ videoReducer: videoState, envReducer: envState });

describe('<Video /> ', () => {
  beforeEach(() => {
    /*
    * issue with react library throws unexpected console error
    * https://github.com/testing-library/react-testing-library/issues/470#issuecomment-528449119
    */
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.mock('react-redux', () => ({ useSelector: jest.fn() }));
    basicStore.dispatch = jest.fn();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should get startTime from prop', () => {
    const { container } = render(
      <Provider store={basicStore}>
        <Video startTime={20} />
      </Provider>,
    );
    const video = container.querySelector('video');
    const event = createEvent.loadedMetadata(video, {});
    fireEvent(video, event);
    expect(container.querySelector('video').currentTime).toEqual(20);
  });

  test('should pause on isPlayed false', () => {
    const state = mockStore({
      videoReducer: { ...videoState, isPlayed: false },
      envReducer: envState,
    });
    render(
      <Provider store={state}>
        <Video />
      </Provider>,
    );
    expect(pauseStub).toHaveBeenCalled();
  });

  test('should play on isPlayed true', () => {
    const state = mockStore({
      videoReducer: { ...videoState, isPlayed: true },
      envReducer: envState,
    });
    render(
      <Provider store={state}>
        <Video />
      </Provider>,
    );
    expect(playStub).toHaveBeenCalled();
  });

  test('should get seekedTime from store if isSeeked true', () => {
    const state = mockStore({
      videoReducer: { ...videoState, seekedTime: 20, isSeeked: true },
      envReducer: envState,
    });
    const { container } = render(
      <Provider store={state}>
        <Video />
      </Provider>,
    );
    expect(container.querySelector('video').currentTime).toEqual(20);
  });

  test('should not get seekedTime from store if isSeeked false', () => {
    const state = mockStore({
      videoReducer: { ...videoState, seekedTime: 20, isSeeked: false },
      envReducer: envState,
    });
    const { container } = render(
      <Provider store={state}>
        <Video />
      </Provider>,
    );
    expect(container.querySelector('video').currentTime).toEqual(0);
  });

  test('should dispatch duration from video', () => {
    const { container } = render(
      <Provider store={basicStore}>
        <Video />
      </Provider>,
    );
    const video = container.querySelector('video');
    const event = createEvent.durationChange(video, {});
    fireEvent(video, event);
    expect(basicStore.dispatch).toHaveBeenCalledWith(setDuration(NaN));
  });

  test('should dispatch currentTime on timeupdate', () => {
    const { container } = render(
      <Provider store={basicStore}>
        <Video />
      </Provider>,
    );
    const video = container.querySelector('video');
    const event = createEvent.timeUpdate(video, { target: { currentTime: 20 } });
    fireEvent(video, event);
    expect(basicStore.dispatch).toHaveBeenCalledWith(setCurrentTime(20));
  });

  test('should dispatch isSeeked = false on timeupdate', () => {
    const { container } = render(
      <Provider store={basicStore}>
        <Video />
      </Provider>,
    );
    const video = container.querySelector('video');
    const event = createEvent.timeUpdate(video, {});
    fireEvent(video, event);
    expect(basicStore.dispatch).toHaveBeenCalledWith(setIsSeeked(false));
  });
});
