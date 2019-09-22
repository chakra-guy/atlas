import React, { useEffect } from "react"
import { map, distinctUntilChanged, tap } from "rxjs/operators"
import { styled } from "baseui"
import { useObservable } from "rxjs-hooks"

import { Map } from "../components"
import store$, { dispatch } from "../utils/store$"
import { setDistance, setGeo, fetchNearByPlacesFixme } from "./homeActions"

const view$ = store$.pipe(
  map((state: any) => state.map),
  distinctUntilChanged(),
  tap(() => console.log("map changed")),
)

// FIXME remove this
const initialState = {
  geo: { lat: 47.497903, lon: 19.054647 },
  distance: 250,
  places: [],
}

export default function Mainpage() {
  const { geo, distance, places } = useObservable(() => view$, initialState)

  useEffect(() => {
    // FIXME this whole thing could be in rxjs
    dispatch(fetchNearByPlacesFixme({ geo, distance }))
  }, [geo, distance])

  return (
    <>
      <DistanceContainer>
        distance
        <input
          type="text"
          value={distance}
          onChange={e => dispatch(setDistance(+e.target.value))}
        />
      </DistanceContainer>
      <MapContainer>
        <Map
          places={places}
          setCoordinatinates={(lat: number, lon: number) => dispatch(setGeo({ lat, lon }))}
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
