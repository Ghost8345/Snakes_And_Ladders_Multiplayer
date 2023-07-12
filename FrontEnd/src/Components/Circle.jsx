import React, { useRef, useEffect } from 'react';

const Circle = ({ x, y, radius, color }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }, [x, y, radius, color]);

  return <canvas ref={canvasRef} />;
};

export default Circle;