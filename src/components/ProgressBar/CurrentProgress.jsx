import React from 'react';
import PropTypes from 'prop-types';

const CurrentProgress = ({ progress }) => (
  <div
    className="progress_bar__current_progress"
    style={{ width: `${progress}%` }}
  />
);

CurrentProgress.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default CurrentProgress;
