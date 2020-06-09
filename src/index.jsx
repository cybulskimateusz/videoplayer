import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import VideoFrame from './components/VideoFrame/VideoFrame';
import withRoutedTime from './utils/withRoutedTime';

const RoutedVideo = withRoutedTime(VideoFrame);
const hotspots = [{ time: 5, title: 'example1' }, { time: 7, title: 'example2' }];
ReactDOM.render(
  <BrowserRouter>
    <RoutedVideo hotspots={hotspots} />
  </BrowserRouter>,
  document.querySelector('#root'),
);
