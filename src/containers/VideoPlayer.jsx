import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import withAnimatedRouting from '@/utils/withAnimatedRouting';
import Video from '@/components/Video';
import ControlBar from '@/containers/ControlBar';

import SphericalCanvas from '@/components/SphericalCanvas';
import '@/style/VideoPlayer.scss';

const RoutedVideo = withAnimatedRouting(Video);

const VideoPlayer = () => {
  const videoRef = useRef();
  const { spherical } = useSelector(({ sphericalReducer }) => sphericalReducer);
  const [classValue, setClassValue] = useState('video_player');

  useEffect(() => {
    const sphericalClass = spherical && 'video_player--spherical';
    const classes = classNames('video_player', sphericalClass);
    setClassValue(classes);
  }, [spherical]);

  return (
    <div className={classValue}>
      <RoutedVideo ref={videoRef} />
      { spherical && <SphericalCanvas ref={videoRef} /> }
      <div className="control_bar__outer">
        <ControlBar />
      </div>
    </div>
  );
};

export default VideoPlayer;
