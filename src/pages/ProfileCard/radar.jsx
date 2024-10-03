import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
} from 'chart.js';
import './RadarChart.scss'; // Import SCSS styles

// Register the required chart elements
ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
);

export default function RadarChartExample() {
  // Event handler for when a label is clicked
  const handleLabelClick = (event, label) => {
    console.log(`Clicked on label: ${label}`);
  };

  // Radar chart data (you can replace this with DOTA-style stats later)
  const data = {
    labels: ['Strength', 'Agility', 'Intelligence', 'Attack', 'Speed'],
    datasets: [{
      label: 'Hero Stats',
      data: [85, 70, 60, 90, 80], // Example data points
      backgroundColor: 'rgba(255, 255, 0, 0.2)', // Aqua color with transparency
      borderColor: 'rgba(255, 255, 0, 1)', // Solid Aqua for borders
      pointBackgroundColor: 'rgba(255, 0, 0, 1)', // Solid Red for points
      pointBorderColor: 'rgba(255, 0, 0, 1)',
    }]
  };

  // Radar chart options to customize appearance and behavior
  const options = {
    onClick: (event, elements) => {
      // Handle the click event on the radar chart
      if (elements && elements.length > 0) {
        const clickedLabel = data.labels[elements[0].index];
        handleLabelClick(event, clickedLabel);
      }
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 2, // Larger point radius for more emphasis
        borderWidth: 1, // Thicker point borders
      },
    },
    scales: {
      r: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Subtle grid lines
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.9)', // Light angle lines
        },
        pointLabels: {
          font: {
            size: 14,
            weight: 'bold',
            family: "'Poppins', sans-serif" // Similar to DOTA font style
          },
          color: '#fff', // White label color for radar chart
        },
        ticks: {
          display: false, // Hide the ticks
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend for cleaner look
      },
    },
  };

  return (
    <div className="radar-chart-container">
      <Radar data={data} options={options} />
    </div>
  );
}
