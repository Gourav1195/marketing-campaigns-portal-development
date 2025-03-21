import React, { useState } from 'react';

import {
    styled,
    Box,
    Typography,
    Card,
    CardContent,
    ToggleButton,
    ToggleButtonGroup,
    Button,
    ButtonGroup,

} from '@mui/material';
import { Bar } from 'react-chartjs-2'; // Example chart library
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface EmailSentProps {

}

const EmailSent: React.FC<EmailSentProps> = () => {

    //   const [dateRange, setDateRange] = useState<string>('monthly');
    const [timeFrame, setTimeFrame] = useState('Daily');
    const timeFrames = ['Daily', 'Weekly', 'Monthly'];

    // Example static chart data 
    const chartData = {
        labels: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
            {
                label: 'Click Rate',
                data: [80, 120, 100, 140, 150, 130, 160, 200, 180, 170, 190, 210],
                backgroundColor: '#0057D9',
                borderRadius: 5,
                barPercentage: 0.8,
                categoryPercentage: 0.8,
            },
            {
                label: 'Open Rate',
                data: [250, 230, 180, 260, 300, 280, 320, 400, 370, 330, 360, 390],
                backgroundColor: '#EAECF0',
                borderRadius: 5,
                barPercentage: 0.8,
                categoryPercentage: 0.8,
            },
        ],
    };

    //   const handleDateRangeChange = (
    //     event: React.MouseEvent<HTMLElement>,
    //     newRange: string | null
    //   ) => {
    //     if (newRange) {
    //       setDateRange(newRange);
    //       // fetch new data based on range
    //     }
    //   };


    const handleTimeFrameChange = (frame: string) => {
        setTimeFrame(frame);
    };

    return (
        <Card>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} sx={{flexDirection:{xs:'column', md:'row'}}}>
                    <Typography variant="h6" >Emails Sent</Typography>
                    {/* <ToggleButtonGroup
                    value={dateRange}
                    exclusive
                    onChange={handleDateRangeChange}
                    aria-label="date range"
                  >
                    <ToggleButton value="daily">Daily</ToggleButton>
                    
                    <ToggleButton value="weekly">Weekly</ToggleButton>
                    <ToggleButton value="monthly">Monthly</ToggleButton>
                  </ToggleButtonGroup> */}
                    <Box bgcolor={'#F7F9FF'} p={1} borderRadius={2} border={'1px solid #DEE2E6'}>

                        <ButtonGroup variant="outlined" aria-label="time frame selection" sx={{ gap: 1 }}>
                            {timeFrames.map((frame) => (
                                <Button
                                    key={frame}
                                    onClick={() => handleTimeFrameChange(frame)}
                                    sx={{
                                        borderRadius: '4px  !important',
                                        backgroundColor: timeFrame === frame ? '#0057D9' : '#FFFFFF',
                                        color: timeFrame === frame ? '#FFFFFF' : '#000000',
                                        borderColor: '#F7F9FF',
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
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: "bottom",
                                labels: {
                                    usePointStyle: true,
                                    pointStyle: "circle",
                                },
                            },
                            //   title: { display: true, text: `Email Stats (${dateRange})` },
                            title: { display: true, text: `Email Stats (${timeFrame})` },
                        },
                        scales: {
                            x: { stacked: true, grid: { display: false } },
                            y: { stacked: false, grid: { display: true }, ticks:{ stepSize: 200} },
                        }
                    }}
                />
            </CardContent>
        </Card>

    );
};

export default EmailSent;
