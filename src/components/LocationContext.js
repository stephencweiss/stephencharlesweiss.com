import React, { useEffect, useState } from 'react'

export const LocationContext = React.createContext({})

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState({})
    useEffect(() => {
        const {location:windowLocation} = window
        setLocation(windowLocation)
    }, [])

    LocationContext.location = location
    return (
        <LocationContext.Provider value={LocationContext}>
            {children}
        </LocationContext.Provider>
    )
}
