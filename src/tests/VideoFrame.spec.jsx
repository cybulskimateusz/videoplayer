import React from 'react';
import { fireEvent, createEvent } from '@testing-library/dom';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { videoState } from '@/reducers/videoReducer';
import { setDuration } from '@/actions/videoActions';
import VideoFrame from '@/components/VideoFrame';

const pauseStub = jest
  .spyOn(window.HTMLMediaElement.prototype, 'pause')
  .mockImplementation(() => {});
const playStub = jest
  .spyOn(window.HTMLMediaElement.prototype, 'play')
  .mockImplementation(() => {});
const mockStore = configureStore([]);
const basicStore = mockStore({ videoReducer: videoState });

describe('<VideoFrame /> ', () => {
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
        <VideoFrame startTime={20} />
      </Provider>,
    );
    const video = container.querySelector('video');
    const event = createEvent.loadedMetadata(video, {});
    fireEvent(video, event);
    expect(container.querySelector('video').currentTime).toEqual(20);
  });

  test('should unmute when loadeddata', () => {
    const { container } = render(
      <Provider store={basicStore}>
        <VideoFrame />
      </Provider>,
    );
    const video = container.querySelector('video');
    const event = createEvent.loadedData(video, {});
    fireEvent(video, event);
    expect(video.muted).toBeFalsy();
  });

  test('should pause on isPlayed false', () => {
    const state = mockStore({ videoReducer: { ...videoState, isPlayed: false } });
    render(
      <Provider store={state}>
        <VideoFrame />
      </Provider>,
    );
    expect(pauseStub).toHaveBeenCalled();
  });

  test('should play on isPlayed true', () => {
    const state = mockStore({ videoReducer: { ...videoState, isPlayed: true } });
    render(
      <Provider store={state}>
        <VideoFrame />
      </Provider>,
    );
    expect(playStub).toHaveBeenCalled();
  });
});
