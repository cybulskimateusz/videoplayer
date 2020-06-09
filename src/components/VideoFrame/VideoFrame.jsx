import React, { forwardRef, useRef, useState } from 'react';
import { number } from 'prop-types';

import video from '@/video.mp4';

const VideoFrame = forwardRef(({ time }, ref) => {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(ref);

  const setCurrentTime = () => {
    videoRef.current.currentTime = time;
  };
  const unMute = () => setMuted(false);

  return (
    <video
      ref={videoRef}
      preload="auto"
      muted={muted}
      onLoadedMetadata={setCurrentTime}
      onLoadedData={unMute}
    >
      <source src={video} />
    </video>
  );
});

VideoFrame.propTypes = {
  time: number,
};

VideoFrame.defaultProps = {
  time: 0,
};

export default VideoFrame;
