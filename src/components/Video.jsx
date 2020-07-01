import React, {
  forwardRef, useRef, memo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import useCombinedRefs from '@/utils/useCombinedRefs';

import * as actions from '@/actions/videoActions';
import '@/style/Video.scss';

const Video = memo(forwardRef(({
  startTime,
}, ref) => {
  const videoRef = useRef();
  const combinedRef = useCombinedRefs(videoRef, ref);
  const { src } = useSelector(({ envReducer }) => envReducer);
  const { isPlayed, seekedTime, isSeeked } = useSelector(({ videoReducer }) => videoReducer);

  const dispatch = useDispatch();
  const dispatchDuration = (e) => dispatch(actions.setDuration(e.target.duration));
  const dispatchCurrentTime = (time) => dispatch(actions.setCurrentTime(time));
  const falseIsPlayed = () => dispatch(actions.setIsPlayed(false));
  const falseIsSeeked = () => dispatch(actions.setIsSeeked(false));

  const handleTimeUpdate = (e) => {
    const { currentTime } = e.target;
    dispatchCurrentTime(currentTime);
    falseIsSeeked();
  };
  const setTime = (time) => { combinedRef.current.currentTime = time; };
  const setStartTime = () => setTime(startTime);
  const setSeekedTime = () => setTime(seekedTime);
  const togglePlay = () => (isPlayed ? combinedRef.current.play() : combinedRef.current.pause());

  useEffect(() => { togglePlay(); }, [isPlayed]);
  useEffect(() => { if (isSeeked) setSeekedTime(); }, [seekedTime, isSeeked]);

  return (
    <video
      ref={combinedRef}
      preload="auto"
      onLoadedMetadata={setStartTime}
      onDurationChange={dispatchDuration}
      onTimeUpdate={handleTimeUpdate}
      onEnded={falseIsPlayed}
      className="video"
    >
      <source src={src} />
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
