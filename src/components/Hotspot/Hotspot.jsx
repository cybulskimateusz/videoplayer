import React from 'react';
import PropTypes from 'prop-types';

import HotspotButton from './HotspotLink';
import Thumbnail from './Thumbnail';
import '@/style/Hotspot.scss';

const Hotspot = ({
  time, image, title, description,
}) => (
  <div className="hotspot">
    <div className="hotspot__thumbnail">
      <Thumbnail
        time={time}
        image={image}
        title={title}
        description={description}
      />
    </div>
    <HotspotButton time={time} title={title} />
  </div>
);

Hotspot.propTypes = {
  time: PropTypes.number.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

Hotspot.defaultProps = {
  image: null,
  description: null,
};

export default Hotspot;
