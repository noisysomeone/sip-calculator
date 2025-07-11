import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import Chart from 'chart.js/auto';

export default function ChartComponent({ chartData }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!chartData?.years?.length) return;

    const ctx = canvasRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.years,
        datasets: [
          {
            label: 'Investment Value (₹)',
            data: chartData.values,
            fill: true,
            borderWidth: 2,
          },
        ],
      },
    });
  }, [chartData]);

  return <canvas ref={canvasRef} width="400" height="200"></canvas>;
}