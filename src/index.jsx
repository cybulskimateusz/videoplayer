import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';

import VideoFrame from './components/VideoFrame/VideoFrame';
import withAnimatedRouting from './utils/withAnimatedRouting/withAnimatedRouting';

const hotspots = [{ time: 5, title: 'example1' }, { time: 7, title: 'example2' }];
const RoutedVideo = withAnimatedRouting(VideoFrame);
ReactDOM.render(
  <BrowserRouter>
    <Link to="/example1-5">go!</Link>
    <RoutedVideo hotspots={hotspots} />
  </BrowserRouter>,
  document.querySelector('#root'),
);
