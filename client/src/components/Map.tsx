import React, { useState } from "react"
import ReactMapGL, {
  Marker,
  GeolocateControl,
  ViewportChangeHandler,
  ViewState,
  Popup,
} from "react-map-gl"
import { styled } from "baseui"

import "./map.css"

import { useDebouncedCallback } from "../hooks"
import { Place } from "../types"

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`

const MarkerIcon = styled("svg", p => ({
  fill: p.$theme.colors.accent,
  height: "20px",
  cursor: "pointer",
  stroke: "none",
  transform: "translate(-10px, -20px)",
}))

const PopupContent = styled("div", {
  display: "flex",
  width: "240px",
  height: "120px",
})

type Props = {
  places: Place[]
  setCoordinatinates: (lat: number, lon: number) => void
}

export default function Map({ places, setCoordinatinates }: Props): JSX.Element {
  const [popup, setPopup] = useState<any>({ open: false, place: {} })
  const [viewport, setViewport] = useState<ViewState>({
    latitude: 47.4979,
    longitude: 19.05465,
    zoom: 16,
  })

  const updateCoordinatinates = useDebouncedCallback(setCoordinatinates, 250)

  const handleViewportChange: ViewportChangeHandler = viewState => {
    setViewport(state => ({ ...state, ...viewState }))
    updateCoordinatinates(viewState.latitude, viewState.longitude)
  }

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={handleViewportChange}
      width="100%"
      height="100%"
    >
      {places.map(place => (
        <Marker key={place.id} latitude={place.lat} longitude={place.lon}>
          <MarkerIcon viewBox="0 0 24 24" onClick={() => setPopup({ open: true, place })}>
            <path d={ICON} />
          </MarkerIcon>
        </Marker>
      ))}

      {popup.open && (
        <Popup
          latitude={popup.place.lat}
          longitude={popup.place.lon}
          closeButton
          closeOnClick={false}
          onClose={() => setPopup({ open: false, place: { lat: 0, lon: 0 } })}
          anchor="bottom"
        >
          <PopupContent>
            <img src={popup.place.logo} alt="company logo" />
            <div>{popup.place.name}</div>
            <div>{popup.place.rating}</div>
          </PopupContent>
        </Popup>
      )}

      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation
        showUserLocation
      />
    </ReactMapGL>
  )
}
