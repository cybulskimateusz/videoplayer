import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/containers/App';
import video from './video.mp4';

const hotspots = [{ time: 5, title: 'example1', imageUrl: 'https://cdn.pixabay.com/photo/2019/07/28/07/03/kitty-4368029_960_720.jpg' }, { time: 7, title: 'example2' }];
ReactDOM.render(
  <App hotspots={hotspots} video={video} />,
  document.querySelector('#root'),
);
