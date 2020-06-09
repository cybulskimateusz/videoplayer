import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

const withRoutedTime = (Component) => ({ hotspots, ref }) => {
  const reducedHotspots = hotspots && hotspots.reduce((acc, cur) => {
    const x = acc.find((item) => item.time === cur.time);
    return !x ? acc.concat([cur]) : acc;
  }, []);

  return (
    <>
      <Route exact path="/">
        <Component ref={ref} />
      </Route>
      { reducedHotspots && reducedHotspots.map(
        ({ time, title }) => (
          <Route path={`/${title}-${time}`} key={time}>
            <Component time={time} ref={ref} />
          </Route>
        ),
      )}
    </>
  );
};

withRoutedTime.propTypes = {
  hotspots: PropTypes.arrayOf(PropTypes.object),
  ref: PropTypes.ref,
};

export default _.curry(withRoutedTime);
