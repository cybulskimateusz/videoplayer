/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef } from 'react';
import Dom from './Dom';

const withCoordinatesDetection = (Component) => () => {
  const wcdRef = useRef();
  const [coordinates, setCoordinates] = useState();
  const [isDetecting, setIsDetecting] = useState(false);

  const setCoordinatesFromPointerPosition = (e) => {
    const mousePositions = Dom.getPointerPosition(wcdRef, e);
    setCoordinates(mousePositions);
  };

  const handleDocMouseUp = (e) => {
    document.removeEventListener('mouseup', handleDocMouseUp);
    document.removeEventListener('mousemove', setCoordinatesFromPointerPosition);
    setIsDetecting(false);
    setCoordinatesFromPointerPosition(e);
  };

  const handleMouseDown = (e) => {
    document.addEventListener('mousemove', setCoordinatesFromPointerPosition);
    document.addEventListener('mouseup', handleDocMouseUp);
    setIsDetecting(true);
    setCoordinatesFromPointerPosition(e);
  };

  return (
    <div ref={wcdRef} onMouseDown={handleMouseDown}>
      <Component coordinates={coordinates} isDetecting={isDetecting} />
    </div>
  );
};

export default withCoordinatesDetection;
