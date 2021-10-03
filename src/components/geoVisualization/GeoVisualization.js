import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'

import { API_KEY } from "../../config/config"

import { getPoi } from "../../services/services"

const GeoVisualization = () => {
    const [poi, setPoi] = useState([])

    const servicesApi = async () => {
        try {
            getPoi().then(({ data }) => {
                setPoi(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        servicesApi()
    }, [])

    const renderMarkers = (map, maps, location) => {
        let marker = new maps.Marker({
            position: { lat: location.lat, lng: location.lon },
            map,
            title: location.name
        });
        return marker;
    };

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={{ lat: 43.6708, lng: -79.3899 }}
                defaultZoom={3}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map, maps }) => {
                    poi.map((location, index) => {
                        renderMarkers(map, maps, location)
                    })
                }}
            >
            </GoogleMapReact>
        </div>
    )
}

export default GeoVisualization
