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

    const selectedItem = data.find((item) => item._id === selectedId);

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

    const ageRanges = sortedData.map((group) => group.ageRange);
    const counts = sortedData.map((group) => group.count);

    // Calculate the maximum count for scaling the graph
    const maxCount = Math.max(...counts);

    // Set canvas dimensions
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const barWidth = canvasWidth /( ageRanges.length+0.7);
    const barGap = 15; // Adjust the gap between bars here

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw bars
    counts.forEach((count, index) => {
      const barHeight = (count / maxCount) * canvasHeight * 0.8;
      const x = (barWidth + barGap) * index; // Apply the gap between bars
      const y = canvasHeight - barHeight;

      // Set random color for each bar
      const barColor = getRandomColor();

      // Draw the 3D effect
      const depth = 10;
      ctx.fillStyle = barColor;
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 1;

      // Draw the front face of the bar
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw the top face of the bar
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + depth, y - depth);
      ctx.lineTo(x + barWidth + depth, y - depth);
      ctx.lineTo(x + barWidth, y);
      ctx.closePath();
      ctx.fillStyle = shadeColor(barColor, -20); // Apply shading effect
      ctx.fill();
      ctx.stroke();

      // Draw the side face of the bar
      ctx.beginPath();
      ctx.moveTo(x + barWidth, y);
      ctx.lineTo(x + barWidth + depth, y - depth);
      ctx.lineTo(x + barWidth + depth, y - depth + barHeight);
      ctx.lineTo(x + barWidth, y + barHeight);
      ctx.closePath();
      ctx.fillStyle = shadeColor(barColor, -10); // Apply shading effect
      ctx.fill();
      ctx.stroke();

      // Draw the count label above the bar
      ctx.fillStyle = '#000';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(count, x + barWidth / 2, y - 10);

      // Draw the ageRange label below the bar
      ctx.fillText(ageRanges[index], x + barWidth / 2, canvasHeight - 5);
    });

    // Draw the box
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

    // Draw y-axis label (Number of Responses)
    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#000';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Number of Responses', -canvasHeight / 2, 20);
    ctx.restore();

    // Draw x-axis label (Age Group)
    ctx.fillStyle = '#000';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Age Group', canvasWidth / 2, canvasHeight + 35);
  }, [data, selectedId]);

  // Helper function to shade a color
  const shadeColor = (color, percent) => {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)}`;
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', display: 'inline-block' }}>
      <canvas ref={canvasRef} width={800} height={400}></canvas>
    </div>
  );
};

export default BarGraph;
