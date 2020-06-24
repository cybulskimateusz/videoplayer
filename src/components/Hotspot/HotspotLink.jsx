import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '@/style/HotspotLink.scss';

const HotspotLink = ({ time, title }) => (
  <Link
    to={`/${title}-${time}`}
    className="hotspot_link"
  >
    <div className="hotspot_link__inner" />
  </Link>
);


HotspotLink.propTypes = {
  time: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default HotspotLink;
