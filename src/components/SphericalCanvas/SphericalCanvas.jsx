/* eslint-disable no-return-assign */
import React, {
  forwardRef, useRef, useEffect, memo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import SceneBuilder from './SceneBuilder';
import SphericalVideoMesh from './SphericalVideoMesh';
import '@/style/SphericalCanvas.scss';

const scene = new SceneBuilder(0, 0);

const SphericalCanvas = memo(forwardRef((__props, ref) => {
  const location = useLocation();
  const canvasRef = useRef();
  const animationRef = useRef();
  const moveCameraRef = useRef();
  const [vertical, setVertical] = useState(null);
  const [horizontal, setHorizontal] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const {
    top, right, down, left,
  } = useSelector(({ sphericalReducer }) => sphericalReducer);

  const resetCanvas = ({ domElement }) => {
    canvasRef.current.innerHTML = '';
    canvasRef.current.appendChild(domElement);
  };

  const updateDimensions = () => {
    const { clientHeight, clientWidth } = ref.current;
    scene.resize(clientWidth, clientHeight);
  };

  const animate = () => {
    animationRef.current = requestAnimationFrame(animate);
    scene.update();
  };

  const moveCamera = () => {
    moveCameraRef.current = requestAnimationFrame(moveCamera);
    const { rotation } = scene.camera;
    if (vertical === 'top') rotation.x += 0.005;
    if (vertical === 'down') rotation.x -= 0.005;
    if (horizontal === 'right') rotation.y -= 0.005;
    if (horizontal === 'left') rotation.y += 0.005;
  };

  useEffect(() => {
    moveCamera();
    if (!horizontal && !vertical) cancelAnimationFrame(moveCameraRef.current);
    return () => cancelAnimationFrame(moveCameraRef.current);
  }, [horizontal, vertical]);

  useEffect(() => {
    scene.removeMeshByName('video');
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    const video = ref.current;
    const sphericalVideo = new SphericalVideoMesh(video, 'video');
    scene.appendMesh(sphericalVideo.mesh);

    animate();
    resetCanvas(scene.renderer);
    return () => cancelAnimationFrame(animationRef.current);
  }, [location, isReady]);

  useEffect(() => {
    if (ref.current) setIsReady(true);
  }, [ref.current]);

  useEffect(() => {
    if (top) setVertical('top');
    else if (down) setVertical('down');
    else setVertical(null);
    if (right) setHorizontal('right');
    else if (left) setHorizontal('left');
    else setHorizontal(null);
  }, [top, right, down, left]);

  return (
    <div ref={canvasRef} className="spherical_canvas" />
  );
}));

export default SphericalCanvas;
