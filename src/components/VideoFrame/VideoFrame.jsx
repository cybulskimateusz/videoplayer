import React, {
  forwardRef, useRef, useState, memo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import video from './video.mp4';

const VideoFrame = memo(forwardRef(({
  time,
}, ref) => {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(ref);

  const isPlayed = useSelector((state) => state.videoReducer.isPlayed);

  const setCurrentTime = () => { videoRef.current.currentTime = time; };
  const unMute = () => setMuted(false);
  const togglePlay = () => (isPlayed ? videoRef.current.play() : videoRef.current.pause());

  useEffect(() => {
    togglePlay();
  }, [isPlayed]);

  return (
    <video
      ref={videoRef}
      preload="auto"
      muted={muted}
      onLoadedData={unMute}
      onLoadedMetadata={setCurrentTime}
      width="400"
      style={{ position: 'absolute' }}
    >
      <source src={video} />
    </video>
  );
}));

VideoFrame.propTypes = {
  time: PropTypes.number,
};

VideoFrame.defaultProps = {
  time: 0,
};

export default VideoFrame;
