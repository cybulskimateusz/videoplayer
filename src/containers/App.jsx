import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import PropTypes from 'prop-types';

import videoReducer, { videoState } from '@/reducers/videoReducer';
import envReducer from '@/reducers/envReducer';
import VideoPlayer from '@/containers/VideoPlayer';
import '@/style/index.scss';

const App = ({ hotspots, video }) => {
  const environment = { hotspots, src: video };
  const store = createStore(
    combineReducers({ videoReducer, envReducer }),
    { videoReducer: { ...videoState }, envReducer: environment },
    composeWithDevTools(),
  );
  return (
    <BrowserRouter>
      <Provider store={store}>
        <VideoPlayer />
      </Provider>
    </BrowserRouter>
  );
};

App.propTypes = {
  hotspots: PropTypes.arrayOf(
    PropTypes.shape({ time: PropTypes.number, title: PropTypes.string }),
  ),
  video: PropTypes.string.isRequired,
};
App.defaultProps = {
  hotspots: [{}],
};
export default App;
