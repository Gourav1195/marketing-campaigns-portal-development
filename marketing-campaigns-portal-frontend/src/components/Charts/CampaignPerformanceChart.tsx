import React, { useState } from 'react';
import { Box, Typography, Button, ButtonGroup, Card, CardContent } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CampaignPerformanceChart: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState('Monthly');

  const data = {
    labels: ['1 Jan', '3 Jan', '7 Jan', '10 Jan', '14 Jan', '20 Jan', '23 Jan', '27 Jan', '31 Jan'],
    datasets: [
      {
        label: 'Open Rate %',
        data: [40, 30, 45, 35, 75, 60, 50, 65, 55],
        borderColor: '#3f51b5',
        backgroundColor: '#3f51b5',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Click Rate %',
        data: [20, 35, 25, 15, 50, 45, 55, 40, 60],
        borderColor: '#ff9800',
        backgroundColor: '#ff9800',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.raw}%`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        max: 80,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  const handleTimeFrameChange = (frame: string) => {
    setTimeFrame(frame);
  };

  const timeFrames = ['Daily', 'Weekly', 'Monthly'];

  return (
    <Card sx={{ borderRadius: 2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" sx={{flexDirection:{xs:'column', md:'row'}}} alignItems="center" mb={2}>
          <Typography variant="h6" >Campaign Performance</Typography>
          <Box bgcolor={'#F7F9FF'} p={1} borderRadius={2} border={'1px solid #DEE2E6'}>
          <ButtonGroup variant="outlined" aria-label="time frame selection" sx={{gap: 1}}>
            {timeFrames.map((frame) => (
              <Button
                key={frame}
                onClick={() => handleTimeFrameChange(frame)}
                sx={{
                  borderColor: '#F7F9FF',
                  borderRadius: '4px !important',

                  backgroundColor: timeFrame === frame ? '#0057D9' : '#FFFFFF',
                  color: timeFrame === frame ? '#FFFFFF' : '#000000',
                  
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: timeFrame === frame ? '#0057D9' : '#FFFFFF',
                    borderColor: '#F7F9FF!important',
                  },
                }}
              >
                {frame}
              </Button>
            ))}
          </ButtonGroup>
          </Box>

        </Box>
        <Box sx={{ width: '100%', height: { xs: '300px', md: '400px' }, position: 'relative' }}>
          <Line data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CampaignPerformanceChart;
