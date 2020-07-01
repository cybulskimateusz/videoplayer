import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import '@/style/Thumbnail.scss';

const ThumbnailVideo = ({ time }) => {
  const { src } = useSelector(({ envReducer }) => envReducer);
  const srcToTime = `${src}/#t=${time}`;

  return <video src={srcToTime} className="thumbnail__image" />;
};

ThumbnailVideo.propTypes = {
  time: PropTypes.number.isRequired,
};

export default ThumbnailVideo;
