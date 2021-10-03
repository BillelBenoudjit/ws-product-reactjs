import React, { useEffect, useState } from 'react'
import { Table, Pagination } from 'react-bootstrap';
import moment from 'moment'
import Fuse from 'fuse.js'

import { getHourlyStatsWithPoi } from '../../services/services'

const StatTable = () => {
    const [currentStatPage, setCurrentStatPage] = useState(1)
    const [searchValue, setSearchValue] = useState("")
    const [hourlyStatsWithPoi, setHourlyStatsWithPoi] = useState([])

    const statPageSize = 5

    const servicesApi = async () => {
        try {
            getHourlyStatsWithPoi().then(({ data }) => {
                setHourlyStatsWithPoi(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const options = { keys: ["name",] };
        const fuse = new Fuse(hourlyStatsWithPoi, options);
        const results = fuse.search(searchValue).map(({ item }) => item)
        if (results.length > 0) {
            setHourlyStatsWithPoi(results)
        } else {
            servicesApi()
        }
    }, [searchValue, hourlyStatsWithPoi])

    return (
        <>
            <h2 style={{ textAlign: 'left' }}>Hourly Stats</h2>
            <Pagination>
                <Pagination.First onClick={() => setCurrentStatPage(1)} />
                <Pagination.Prev onClick={() => currentStatPage > 1 ?
                    setCurrentStatPage(currentStatPage - 1) :
                    setCurrentStatPage(1)} />
                <Pagination.Item onClick={() => setCurrentStatPage(1)}>{1}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item onClick={() => setCurrentStatPage(Math.floor(hourlyStatsWithPoi?.length / statPageSize))}>
                    {Math.floor(hourlyStatsWithPoi?.length / statPageSize)}
                </Pagination.Item>
                <Pagination.Next onClick={() => currentStatPage < Math.floor(hourlyStatsWithPoi?.length / statPageSize) ?
                    setCurrentStatPage(currentStatPage + 1) :
                    setCurrentStatPage(Math.floor(hourlyStatsWithPoi?.length / statPageSize))} />
                <Pagination.Last onClick={() => setCurrentStatPage(Math.floor(hourlyStatsWithPoi?.length / statPageSize))} />
            </Pagination>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date
                        </th>
                        <th>Name
                        <br></br>
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </th>
                        <th>Clicks
                        </th>
                        <th>Hour</th>
                        <th>Impression</th>
                        <th>Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        hourlyStatsWithPoi?.slice(currentStatPage * statPageSize, (currentStatPage + 1) * statPageSize)?.map((stat, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-left">{moment(stat.date).utc().format('MM/DD/YYYY')}</td>
                                    <td className="text-left">{stat.name}</td>
                                    <td className="text-left">{stat.clicks}</td>
                                    <td className="text-left">{stat.hour}</td>
                                    <td className="text-left">{stat.impressions}</td>
                                    <td className="text-left">{stat.revenue}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default StatTable
