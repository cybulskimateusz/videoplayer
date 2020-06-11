import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, createEvent } from '@testing-library/dom';

import VideoFrame from './VideoFrame';

const container = document.createElement('div');

describe('<VideoFrame /> ', () => {
  beforeEach(() => {
    /*
    * issue with react library throws unexpected console error
    * https://github.com/testing-library/react-testing-library/issues/470#issuecomment-528449119
    */
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('should get time from prop', () => {
    ReactDOM.render(
      <VideoFrame time={20} />,
      container,
    );
    const video = container.querySelector('video');
    const event = createEvent.loadedMetadata(video, {});
    fireEvent(video, event);
    expect(video.currentTime).toEqual(20);
  });

  test('should unmute when loadeddata', () => {
    ReactDOM.render(
      <VideoFrame />,
      container,
    );
    const video = container.querySelector('video');
    const event = createEvent.loadedData(video, {});
    fireEvent(video, event);
    expect(video.muted).toBeFalsy();
  });
});
