import React from 'react';
import PropTypes from 'prop-types';

import ThumbnailVideo from './ThumbnailVideo';
import '@/style/Thumbnail.scss';

const Thumbnail = ({
  image, title, description, time,
}) => (
  <div className="thumbnail">
    { image
      ? <img src={image} alt="Thumbnail" className="thumbnail__image" />
      : <ThumbnailVideo time={time} /> }
    { title && <h1 className="thumbnail__title">{title}</h1> }
    { description && <p className="thumbnail__description">{description}</p> }
  </div>
);

Thumbnail.propTypes = {
  time: PropTypes.number.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

Thumbnail.defaultProps = {
  image: null,
  title: null,
  description: null,
};

export default Thumbnail;
