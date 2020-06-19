import React, {
  forwardRef, useRef, useState, memo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '@/actions/videoActions';
import video from '@/video.mp4';

const VideoFrame = memo(forwardRef(({
  startTime,
}, ref) => {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(ref);

  const dispatch = useDispatch();
  const falseIsPlayed = () => dispatch(actions.setIsPlayed(false));

  const isPlayed = useSelector((state) => state.videoReducer.isPlayed);

  const setTime = (time) => { videoRef.current.currentTime = time; };
  const setStartTime = () => setTime(startTime);
  const unMute = () => setMuted(false);
  const togglePlay = () => (isPlayed ? videoRef.current.play() : videoRef.current.pause());

  useEffect(() => { togglePlay(); }, [isPlayed]);

  return (
    <video
      ref={videoRef}
      preload="auto"
      muted={muted}
      onLoadedData={unMute}
      onLoadedMetadata={setStartTime}
      onEnded={falseIsPlayed}
      width="400"
      style={{ position: 'absolute' }}
    >
      <source src={video} />
    </video>
  );
}));

VideoFrame.propTypes = {
  startTime: PropTypes.number,
};

VideoFrame.defaultProps = {
  startTime: 0,
};

export default VideoFrame;
