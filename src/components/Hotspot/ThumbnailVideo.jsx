import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import '@/style/Thumbnail.scss';

const ThumbnailVideo = ({ time }) => {
  const storedSrc = useSelector(({ envReducer }) => envReducer.src);
  const src = `${storedSrc}/#t=${time}`;

  return <video src={src} className="thumbnail__image" />;
};

ThumbnailVideo.propTypes = {
  time: PropTypes.number.isRequired,
};

export default ThumbnailVideo;
