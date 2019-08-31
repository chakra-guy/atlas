import React, { useState } from "react"
import ReactMapGL, { Marker, GeolocateControl, ViewportChangeHandler } from "react-map-gl"

import { useDebouncedCallback } from "../hooks"
import { Place } from "../App"

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`

// const geolocateStyle = {
//   position: "absolute",
//   top: 0,
//   left: 0,
//   margin: 10,
// }

const pinStyle = {
  cursor: "pointer",
  fill: "#d00",
  stroke: "none",
}

type Props = {
  places: Array<Place>
  setCoordinatinates: (a: number, b: number) => void
}

export default function Map({ places, setCoordinatinates }: Props): JSX.Element {
  const [viewport, setViewport] = useState({
    latitude: 47.4979,
    longitude: 19.05465,
    zoom: 16,
    height: 400,
    width: 400,
  })

  const handleUpdate = useDebouncedCallback(setCoordinatinates, 250)

  const handleViewportChange: ViewportChangeHandler = viewState => {
    setViewport(state => ({ ...state, ...viewState }))
    handleUpdate(viewport.latitude, viewport.longitude)
  }

  return (
    <ReactMapGL
      width="100%"
      height="100%"
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={handleViewportChange}
      {...viewport}
    >
      {places.length > 0 &&
        places.map(place => (
          <Marker key={place.id} latitude={place.lat} longitude={place.lon}>
            <svg
              height={20}
              viewBox="0 0 24 24"
              style={{
                ...pinStyle,
                transform: `translate(${-20 / 2}px,${-20}px)`,
              }}
              onClick={() => console.log("place", place.name)}
            >
              <path d={ICON} />
            </svg>
          </Marker>
        ))}

      <GeolocateControl
        // style={geolocateStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation
        showUserLocation
      />
    </ReactMapGL>
  )
}
