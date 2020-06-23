import React, { useRef } from 'react';

import withAnimatedRouting from '@/utils/withAnimatedRouting';
import Video from '@/components/Video';
import ControlBar from '@/containers/ControlBar';

import '@/style/VideoPlayer.scss';

const RoutedVideo = withAnimatedRouting(Video);

const VideoPlayer = () => {
  const videoRef = useRef();

  return (
    <div className="video_player">
      <RoutedVideo ref={videoRef} />
      <div className="control_bar__outer">
        <ControlBar />
      </div>
    </div>
  );
};

export default VideoPlayer;
