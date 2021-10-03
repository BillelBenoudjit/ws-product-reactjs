import React, { useEffect, useState } from 'react'
import EventChart from './EventChart'
import StatChart from './StatChart'

const Charts = () => {
    return (
        <div>
            <EventChart />
            <StatChart />
        </div>
    )
}

export default Charts
