import React, { useState, useEffect } from "react"
import { Place } from "../types"
import { Map } from "../components"

export default function Mainpage() {
  const [geo, setGeo] = useState({ lat: 47.497903, lon: 19.054647 })
  const [distance, setDistance] = useState(250)
  const [places, setPlaces] = useState<Array<Place>>([])

  useEffect(() => {
    const baseURL = "http://localhost:4000/api"
    fetch(
      `${baseURL}/places?place[lat]=${geo.lat}&place[lon]=${geo.lon}&place[distance]=${distance}`,
    )
      .then(response => response.json())
      .then(({ data }) => setPlaces(data))
      .catch(() => {
        //
      })
  }, [geo, distance])

  return (
    <div>
      mainpage
      <div className="input-container">
        distance
        <input type="text" value={distance} onChange={e => setDistance(+e.target.value)} />
      </div>
      <div className="map-container">
        <Map
          places={places}
          setCoordinatinates={(lat: number, lon: number) => setGeo({ lat, lon })}
        />
      </div>
    </div>
  )
}
