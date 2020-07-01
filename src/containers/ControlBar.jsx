import React from 'react';
import { useSelector } from 'react-redux';

import ProgressBar from '@/components/ProgressBar';
import PlayButton from '@/components/PlayButton';
import DirectionController from '@/components/DirectionController';
import HotspotBar from './HotspotBar';

import '@/style/ControlBar.scss';

const ControlBar = () => {
  const { spherical } = useSelector(({ sphericalReducer }) => sphericalReducer);
  return (
    <div className="control_bar">
      <div className="control_bar__inner">
        <PlayButton />
        <div className="center progress_bar__outer">
          <HotspotBar />
          <ProgressBar />
        </div>
        <div className="center">
          { spherical && <DirectionController /> }
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
