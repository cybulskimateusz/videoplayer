import React from 'react';
import {
  Route, useLocation, Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import _ from 'lodash';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './withAnimatedRouting.scss';

const withRoutedTime = (Component) => ({ hotspots, ref }) => {
  const location = useLocation();

  const reducedHotspots = hotspots && hotspots.reduce((acc, cur) => {
    const x = acc.find((item) => item.time === cur.time);
    return !x ? acc.concat([cur]) : acc;
  }, []);

  return (
    <TransitionGroup>
      <CSSTransition
        classNames="seek"
        timeout={600}
        key={location.key}
      >
        <Switch location={location}>
          <Route exact path="/">
            <Component ref={ref} />
          </Route>
          { reducedHotspots && reducedHotspots.map(
            ({ time, title }) => (
              <Route path={`/${title}-${time}`} key={`${uuid()}-${location.key}`}>
                <Component time={time} ref={ref} />
              </Route>
            ),
          )}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

withRoutedTime.propTypes = {
  hotspots: PropTypes.arrayOf(PropTypes.object),
  ref: PropTypes.ref,
};

export default _.curry(withRoutedTime);
