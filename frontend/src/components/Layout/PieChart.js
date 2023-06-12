import React, { useEffect, useRef } from 'react';

const PieChart = ({ data }) => {
  const canvasRef = useRef(null);

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
      const sliceColor = getRandomColor();
      item.color = sliceColor; // Assign color to the data item
      ctx.fillStyle = sliceColor;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) / 3,
        startAngle,
        startAngle + sliceAngle
      );
      ctx.closePath();
      ctx.fill();

      // Draw label with data number
      ctx.fillStyle = '#000';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const labelX =
        canvas.width / 2 +
        (Math.min(canvas.width, canvas.height) / 3 + 30) * Math.cos(startAngle + sliceAngle / 2);
      const labelY =
        canvas.height / 2 +
        (Math.min(canvas.width, canvas.height) / 3 + 30) * Math.sin(startAngle + sliceAngle / 2);
      ctx.fillText(`${item._id} (${item.count})`, labelX, labelY);

      // Update start angle for next slice
      startAngle += sliceAngle;
    });
  }, [data, getRandomColor]);

  const containerStyle = {
    width: '500px',
    height: '450px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Add overflow property to prevent pie chart overlap
  };

  return (
    <div style={containerStyle}>
      <canvas ref={canvasRef} width={400} height={400}></canvas>
    </div>
  );
};

export default PieChart;
