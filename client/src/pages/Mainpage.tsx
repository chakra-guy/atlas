import React, { useState, useEffect } from "react"
import { styled } from "baseui"
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
    <>
      <DistanceContainer>
        distance
        <input type="text" value={distance} onChange={e => setDistance(+e.target.value)} />
      </DistanceContainer>
      <MapContainer>
        <Map
          places={places}
          setCoordinatinates={(lat: number, lon: number) => setGeo({ lat, lon })}
        />
      </MapContainer>
    </>
  )
}

const DistanceContainer = styled("div", {
  position: "absolute",
  background: "white",
  margin: "24px",
  padding: "12px",
  "border-radius": "8px",
  "box-shadow": "0px 2px 4px rgba(0, 0, 0, 0.12)",
  "z-index": 1994,
})

const MapContainer = styled("div", {
  height: "100%",
  width: "100%",
  "background-color": "aquamarine",
})
