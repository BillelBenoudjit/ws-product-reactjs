import React, { useState, useEffect } from 'react'
import { Table, Pagination, Container } from 'react-bootstrap';
import moment from 'moment'
import Fuse from 'fuse.js'

import { getHourlyStatsWithPoi } from '../../services/services'

import StatTable from './StatTable'
import EventTable from './EventTable'

const DataTable = () => {
    const [currentEventPage, setCurrentEventPage] = useState(1)
    const [eventPageSize, setEventPageSize] = useState(5)
    const [searchValue, setSearchValue] = useState("")
    const [textFilter, setTextFilter] = useState(null)
    const [initNumber, setInitNumber] = useState(0);

    return (
        <>
            <StatTable />
            <EventTable />
        </>
    )
}

export default DataTable
