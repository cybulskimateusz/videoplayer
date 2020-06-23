import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import PropTypes from 'prop-types';

import videoReducer, { videoState } from '@/reducers/videoReducer';
import hotspotsReducer from '@/reducers/hotspotsReducer';
import VideoPlayer from '@/containers/VideoPlayer';
import '@/style/index.scss';

const App = ({ hotspots }) => {
  const store = createStore(
    combineReducers({ videoReducer, hotspotsReducer }),
    { videoReducer: videoState, hotspotsReducer: hotspots },
    composeWithDevTools(),
  );
  return (
    <BrowserRouter>
      <Provider store={store}>
        <VideoPlayer />
      </Provider>
      <Link to="/example1-5">go!</Link>
    </BrowserRouter>
  );
};

App.propTypes = {
  hotspots: PropTypes.arrayOf(
    PropTypes.shape({ time: PropTypes.number, title: PropTypes.string }),
  ),
};
App.defaultProps = {
  hotspots: [{}],
};
export default App;
