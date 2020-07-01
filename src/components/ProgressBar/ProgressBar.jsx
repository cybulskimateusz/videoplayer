import React, {
  useState, useEffect, memo,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { setSeekedTime, setIsSeeked } from '@/actions/videoActions';
import * as Calc from '@/utils/Calc';
import CurrentProgress from './CurrentProgress';
import '@/style/ProgressBar.scss';

const ProgressBar = memo(({ coordinates, isDetecting }) => {
  const [progress, setProgress] = useState(0);
  const { currentTime, duration } = useSelector(({ videoReducer }) => videoReducer);

  const dispatch = useDispatch();

  const seekedProgress = () => {
    const { x } = coordinates.percent;
    return Calc.rangedValue(x, 0, 100);
  };
  const setSeekedProgress = () => {
    setProgress(seekedProgress());
  };
  const dispatchSeekTime = () => {
    const time = Calc.getValueFromPercent(seekedProgress(), duration);
    dispatch(setSeekedTime(time));
  };
  const dispatchIsSeekedTrue = () => dispatch(setIsSeeked(true));
  const setProgressFromTime = () => {
    const currentProgress = Calc.getPercent(currentTime, duration);
    setProgress(currentProgress || 0);
  };

  useEffect(() => {
    if (!isDetecting) setProgressFromTime();
  }, [currentTime]);

  useEffect(() => {
    if (isDetecting) setSeekedProgress();
    else if (!isDetecting && coordinates) {
      dispatchIsSeekedTrue();
      dispatchSeekTime();
    }
  }, [coordinates]);

  return (
    <div className="progress_bar" value={progress}>
      <CurrentProgress progress={progress} />
    </div>
  );
});

ProgressBar.propTypes = {
  coordinates: PropTypes.shape({
    percent: PropTypes.shape({ x: PropTypes.number }),
  }),
  isDetecting: PropTypes.bool.isRequired,
};

ProgressBar.defaultProps = {
  coordinates: null,
};

export default ProgressBar;
