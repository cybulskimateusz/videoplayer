import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/containers/App';

const hotspots = [{ time: 5, title: 'example1' }, { time: 7, title: 'example2' }];
ReactDOM.render(
  <App hotspots={hotspots} />,
  document.querySelector('#root'),
);
