import React, { useEffect, useState } from 'react'
import { Table, Pagination } from 'react-bootstrap';
import moment from 'moment'
import Fuse from 'fuse.js'

import { getHourlyEventsWithPoi } from '../../services/services'


const EventTable = () => {
    const [currentEventPage, setCurrentEventPage] = useState(1)
    const [searchValue, setSearchValue] = useState("")
    const [hourlyEventsWithPoi, setHourlyEventsWithPoi] = useState([])

    const eventPageSize = 5

    const servicesApi = async () => {
        try {
            getHourlyEventsWithPoi().then(({ data }) => {
                setHourlyEventsWithPoi(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const options = { keys: ["name",] };
        const fuse = new Fuse(hourlyEventsWithPoi, options);
        const results = fuse.search(searchValue).map(({ item }) => item)
        if (results.length > 0) {
            setHourlyEventsWithPoi(results)
        } else {
            servicesApi()
        }
    }, [searchValue])

    return (
        <>
            <h2 style={{ textAlign: 'left' }}>Hourly Events</h2>
            <Pagination>
                <Pagination.First onClick={() => setCurrentEventPage(1)} />
                <Pagination.Prev onClick={() => currentEventPage > 1 ?
                    setCurrentEventPage(currentEventPage - 1) :
                    setCurrentEventPage(1)} />
                <Pagination.Item onClick={() => setCurrentEventPage(1)}>{1}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item onClick={() => setCurrentEventPage(Math.floor(setHourlyEventsWithPoi?.length / eventPageSize))}>
                    {Math.floor(hourlyEventsWithPoi?.length / eventPageSize)}
                </Pagination.Item>
                <Pagination.Next onClick={() => currentEventPage < Math.floor(setHourlyEventsWithPoi?.length / eventPageSize) ?
                    setCurrentEventPage(currentEventPage + 1) :
                    setCurrentEventPage(Math.floor(setHourlyEventsWithPoi?.length / eventPageSize))} />
                <Pagination.Last onClick={() => setCurrentEventPage(Math.floor(setHourlyEventsWithPoi?.length / eventPageSize))} />
            </Pagination>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name
                        <br></br>
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </th>
                        <th>Hour</th>
                        <th>Events</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        hourlyEventsWithPoi?.slice(currentEventPage * eventPageSize, (currentEventPage + 1) * eventPageSize)?.map((stat, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-left">{moment(stat.date).utc().format('MM/DD/YYYY')}</td>
                                    <td className="text-left">{stat.name}</td>
                                    <td className="text-left">{stat.hour}</td>
                                    <td className="text-left">{stat.events}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default EventTable
