import React, {
  forwardRef, useRef, useState, memo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '@/actions/videoActions';
import '@/style/Video.scss';
import video from '@/video.mp4';

const Video = memo(forwardRef(({
  startTime,
}, ref) => {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(ref);

  const dispatch = useDispatch();
  const dispatchDuration = (e) => dispatch(actions.setDuration(e.target.duration));
  const dispatchCurrentTime = (time) => dispatch(actions.setCurrentTime(time));
  const falseIsPlayed = () => dispatch(actions.setIsPlayed(false));
  const falseIsSeeked = () => dispatch(actions.setIsSeeked(false));

  const isPlayed = useSelector(({ videoReducer }) => videoReducer.isPlayed);
  const seekedTime = useSelector(({ videoReducer }) => videoReducer.seekedTime);
  const isSeeked = useSelector(({ videoReducer }) => videoReducer.isSeeked);

  const handleTimeUpdate = (e) => {
    const { currentTime } = e.target;
    dispatchCurrentTime(currentTime);
    falseIsSeeked();
  };
  const setTime = (time) => { videoRef.current.currentTime = time; };
  const setStartTime = () => setTime(startTime);
  const setSeekedTime = () => setTime(seekedTime);
  const unMute = () => setMuted(false);
  const togglePlay = () => (isPlayed ? videoRef.current.play() : videoRef.current.pause());

  useEffect(() => { togglePlay(); }, [isPlayed]);
  useEffect(() => { if (isSeeked) setSeekedTime(); }, [seekedTime, isSeeked]);

  return (
    <video
      ref={videoRef}
      preload="auto"
      muted={muted}
      onLoadedData={unMute}
      onLoadedMetadata={setStartTime}
      onDurationChange={dispatchDuration}
      onTimeUpdate={handleTimeUpdate}
      onEnded={falseIsPlayed}
      className="video"
    >
      <source src={video} />
    </video>
  );
}));

Video.propTypes = {
  startTime: PropTypes.number,
};

Video.defaultProps = {
  startTime: 0,
};

export default Video;
