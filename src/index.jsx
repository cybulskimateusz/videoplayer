import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/containers/App';
import video from './video.mp4';

const hotspots = [{ time: 5, title: 'example1' }, { time: 7, title: 'example2' }];
ReactDOM.render(
  <App hotspots={hotspots} video={video} />,
  document.querySelector('#root'),
);
