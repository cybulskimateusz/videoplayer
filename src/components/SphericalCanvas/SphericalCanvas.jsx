import React, { forwardRef, useRef, useEffect } from 'react';
import { useLocation } from 'react-router';

import SceneBuilder from './SceneBuilder';
import SphericalVideoMesh from './SphericalVideoMesh';
import '@/style/SphericalCanvas.scss';

const SphericalCanvas = forwardRef((__props, ref) => {
  const canvasRef = useRef();
  const location = useLocation();
  const scene = new SceneBuilder(0, 0);

  const resetCanvas = ({ domElement }) => {
    canvasRef.current.innerHTML = '';
    canvasRef.current.appendChild(domElement);
  };

  const updateDimensions = () => {
    const { clientHeight, clientWidth } = ref.current;
    scene.resize(clientWidth, clientHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    const video = ref.current;
    const sphericalVideo = new SphericalVideoMesh(video, 'video');
    scene.appendMesh(sphericalVideo.mesh);

    const animate = () => {
      requestAnimationFrame(animate);
      scene.update();
    };

    animate();
    resetCanvas(scene.renderer);
  }, [ref.current, location]);

  return (
    <div ref={canvasRef} className="spherical_canvas" />
  );
});

export default SphericalCanvas;
