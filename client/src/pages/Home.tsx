import React from "react"
import { map, distinctUntilChanged, tap } from "rxjs/operators"
import { styled } from "baseui"
import { useObservable } from "rxjs-hooks"

import { Map, PlacePage } from "../components"
import store$, { dispatch } from "../store$"
import { setDistance, setGeo } from "../actions/map"

const DistanceContainer = styled("div", p => ({
  position: "absolute",
  background: p.$theme.colors.mono100,
  margin: p.$theme.sizing.scale800,
  padding: p.$theme.sizing.scale500,
  borderRadius: p.$theme.sizing.scale300,
  boxShadow: p.$theme.lighting.shadow500,
  zIndex: 1000,
}))

const MapContainer = styled("div", p => ({
  height: "100%",
  width: "100%",
  backgroundColor: p.$theme.colors.mono100,
}))

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
  const { distance, places } = useObservable(() => view$, initialState)

  return (
    <>
      <PlacePage places={places} />
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
