import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import videoReducer, { videoState } from '@/reducers/videoReducer';
import VideoFrame from './components/VideoFrame/VideoFrame';
import withAnimatedRouting from './utils/withAnimatedRouting/withAnimatedRouting';

const hotspots = [{ time: 5, title: 'example1' }, { time: 7, title: 'example2' }];
const RoutedVideo = withAnimatedRouting(VideoFrame);
const store = createStore(
  combineReducers({ videoReducer }),
  { videoReducer: videoState },
  composeWithDevTools(),
);
ReactDOM.render(
  <BrowserRouter>
    <Link to="/example1-5">go!</Link>
    <Provider store={store}>
      <RoutedVideo hotspots={hotspots} />
    </Provider>
  </BrowserRouter>,
  document.querySelector('#root'),
);
