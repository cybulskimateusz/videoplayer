import React, { forwardRef } from 'react';
import {
  Route, useLocation, Switch,
} from 'react-router-dom';
import uuid from 'react-uuid';
import _ from 'lodash';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';

import '@/style/withAnimatedRouting.scss';


const withRoutedTime = (Component) => forwardRef((__props, ref) => {
  const location = useLocation();
  const hotspots = useSelector(({ envReducer }) => envReducer.hotspots);

  const reducedHotspots = hotspots && hotspots.reduce((acc, cur) => {
    const x = acc.find((item) => item.time === cur.time);
    return !x ? acc.concat([cur]) : acc;
  }, []);

  return (
    <TransitionGroup>
      <CSSTransition
        classNames="seek"
        timeout={1000}
        key={location.key}
      >
        <Switch location={location}>
          <Route exact path="/">
            <Component ref={ref} />
          </Route>
          { reducedHotspots && reducedHotspots.map(
            ({ time, title }) => (
              <Route path={`/${title}-${time}`} key={`${uuid()}-${location.key}`}>
                <Component startTime={time} ref={ref} />
              </Route>
            ),
          )}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
});


export default _.curry(withRoutedTime);
