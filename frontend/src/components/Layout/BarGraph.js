import React, { useEffect, useRef } from 'react';

const BarGraph = ({ data, selectedId }) => {
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

    const selectedItem = data.find(item => item._id === selectedId);

    if (!selectedItem) {
      return;
    }

    const groupsData = selectedItem.groups;

    // Extract ageRange and count from each group and sort by ageRange
    const sortedData = groupsData.sort((a, b) => {
      if (a.ageRange < b.ageRange) return -1;
      if (a.ageRange > b.ageRange) return 1;
      return 0;
    });

    const ageRanges = sortedData.map(group => group.ageRange);
    const counts = sortedData.map(group => group.count);

    // Calculate the maximum count for scaling the graph
    const maxCount = Math.max(...counts);

    // Set canvas dimensions
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const barWidth = canvasWidth / ageRanges.length;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw bars
    counts.forEach((count, index) => {
      const barHeight = (count / maxCount) * canvasHeight * 0.8;
      const x = barWidth * index;
      const y = canvasHeight - barHeight;

      // Set random color for each bar
      const barColor = getRandomColor();
      ctx.fillStyle = barColor;
      ctx.strokeStyle = barColor;
      ctx.lineWidth = 1;

      // Draw the bar
      ctx.fillRect(x, y, barWidth, barHeight);
      ctx.strokeRect(x, y, barWidth, barHeight);

      // Draw the count label above the bar
      ctx.fillStyle = '#000';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(count, x + barWidth / 2, y - 10);

      // Draw the ageRange label below the bar
      ctx.fillText(ageRanges[index], x + barWidth / 2, canvasHeight - 5);
    });
    
    // Draw the box
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

    // Draw y-axis label (Number of Responses)
    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#000';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Number of Responses', -canvasHeight / 2, 20);
    ctx.restore();

    // Draw x-axis label (Age Group)
    ctx.fillStyle = '#000';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Age Group', canvasWidth / 2, canvasHeight + 20);
  }, [data, selectedId]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', display: 'inline-block' }}>
      <canvas ref={canvasRef} width={400} height={300}></canvas>
    </div>
  );
};

export default BarGraph;
