import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Bar } from 'react-chartjs-2';

import { getDailyStats } from '../../services/services'

const StatChart = () => {
    const [dailyStats, setDailyStats] = useState([])

    const servicesApi = async () => {
        try {
            getDailyStats().then(({ data }) => {
                setDailyStats(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        servicesApi()
    }, [])

    const data = {
        labels: dailyStats?.map(stat => moment(stat.date).utc().format('MM/DD/YYYY')), //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of clicks per stat daily',
                data: dailyStats?.map(stat => stat.clicks), //[12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <>
            <div className='header'>
                <h1 className='title'>Clicks per stat daily</h1>
            </div>
            <Bar data={data} options={options} />
        </>
    )
}

export default StatChart
