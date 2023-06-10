import React, { useEffect, useRef } from 'react';

const PieChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate total count
    const totalCount = data.reduce((total, item) => total + item.count, 0);

    // Set initial angle
    let startAngle = 0;

    // Draw pie slices
    data.forEach((item, index) => {
      const sliceAngle = (item.count / totalCount) * 2 * Math.PI;

      // Set slice color
      ctx.fillStyle = getRandomColor();

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();

      // Draw label
      ctx.fillStyle = '#000';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const labelX = canvas.width / 2 + (canvas.width / 3) * Math.cos(startAngle + sliceAngle / 2);
      const labelY = canvas.height / 2 + (canvas.height / 3) * Math.sin(startAngle + sliceAngle / 2);
      ctx.fillText(`${item._id} (${item.count})`, labelX, labelY);

      // Update start angle for next slice
      startAngle += sliceAngle;
    });
  }, [data]);

  // Generate random color
  const getRandomColor = (() => {
    const colors = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#8BC34A',
      '#9C27B0',
      '#FF5722',
      '#4CAF50',
      '#2196F3',
      '#FF9800',
      '#E91E63',
    ];
    let index = 0;
  
    return () => {
      const color = colors[index];
      index = (index + 1) % colors.length;
      return color;
    };
  })();
  

  return <canvas ref={canvasRef} width={300} height={300}></canvas>;
};

export default PieChart;
