import React from 'react';

import ProgressBar from '@/components/ProgressBar';
import PlayButton from '@/components/PlayButton';
import HotspotBar from './HotspotBar';

import '@/style/ControlBar.scss';

const ControlBar = () => (
  <div className="control_bar">
    <div className="control_bar__inner">
      <PlayButton />
      <div className="progress_bar__outer">
        <HotspotBar />
        <ProgressBar />
      </div>
    </div>
  </div>
);

export default ControlBar;
