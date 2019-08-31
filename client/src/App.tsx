import React, { useState, useEffect } from "react"

import { Map } from "./components"
import "./app.css"

export type Place = {
  id: number
  name: string
  lat: number
  lon: number
}

const baseURL = "http://localhost:4000/api/place"
// const baseURL = "http://192.168.1.242:4000/api/place";

// TODO add ESLint
// TODO add proper types
// TODO test debounced setCoordinatinates()
// TODO figure out what to do with "explicit-function-return-type" rule

export default function App(): JSX.Element {
  const [lat, setLat] = useState(47.497903)
  const [lon, setLon] = useState(19.054647)
  const [distance, setDistance] = useState(150)
  const [places, setPlaces] = useState<Array<Place>>([])

  useEffect(() => {
    fetch(`${baseURL}?lat=${lat}&lon=${lon}&distance=${distance}`)
      .then(response => response.json())
      .then(({ data }) => setPlaces(data))
  }, [lat, lon, distance])

  function setCoordinatinates(newLat: number, newLon: number): void {
    setLat(+newLat)
    setLon(+newLon)
  }

  return (
    <>
      <div className="input-container">
        distance
        <input type="text" value={distance} onChange={e => setDistance(+e.target.value)} />
      </div>
      <div className="map-container">
        <Map places={places} setCoordinatinates={setCoordinatinates} />
      </div>
    </>
  )
}
