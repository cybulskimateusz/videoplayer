import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '@/actions/sphericalActions';
import { rangedValue } from '@/utils/Calc';
import '@/style/DirectionController.scss';

const DirectionController = ({ coordinates, isDetecting }) => {
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();

  const limitedCoordinate = (coordinate) => rangedValue((coordinate - 50), -50, 50);
  const setLimitedDirection = () => {
    const x = limitedCoordinate(coordinates.percent.x);
    const y = limitedCoordinate(coordinates.percent.y);
    setDirection({ x, y });
  };

  useEffect(() => {
    if (isDetecting) {
      setLimitedDirection();
    }
  }, [coordinates]);

  useEffect(() => {
    if (!isDetecting) {
      setDirection({ x: 0, y: 0 });
      dispatch(actions.setTop(false));
      dispatch(actions.setDown(false));
      dispatch(actions.setLeft(false));
      dispatch(actions.setRight(false));
    }
  }, [isDetecting]);

  useEffect(() => {
    if (isDetecting) {
      const { x, y } = direction;
      if (x <= 0) dispatch(actions.setRight(false));
      if (x >= 0) dispatch(actions.setLeft(false));
      if (y <= 0) dispatch(actions.setDown(false));
      if (y >= 0) dispatch(actions.setTop(false));
      if (x === 50) dispatch(actions.setRight(true));
      if (x === -50) dispatch(actions.setLeft(true));
      if (y === 50) dispatch(actions.setDown(true));
      if (y === -50) dispatch(actions.setTop(true));
    }
  }, [direction]);

  return (
    <div className="direction_controller">
      <div
        className="direction_controller__inner"
        style={{
          left: `${direction.x}%`,
          top: `${direction.y}%`,
        }}
      />
    </div>
  );
};

DirectionController.propTypes = {
  coordinates: PropTypes.shape({
    percent: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  }),
  isDetecting: PropTypes.bool,
};

DirectionController.defaultProps = {
  isDetecting: false,
  coordinates: { x: 0, y: 0 },
};


export default DirectionController;
