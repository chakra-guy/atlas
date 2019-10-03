import React, { useState } from "react"
import { map, distinctUntilChanged, tap } from "rxjs/operators"
import { styled } from "baseui"
import { useObservable } from "rxjs-hooks"

import { Map, PlacePanel } from "../components"
import store$, { dispatch } from "../store$"
import { setDistance, setGeo } from "../actions/map"
import { Place } from "../types"

const DistanceContainer = styled("div", p => ({
  position: "absolute",
  bottom: "0",
  right: "0",
  background: p.$theme.colors.mono100,
  margin: p.$theme.sizing.scale800,
  padding: p.$theme.sizing.scale500,
  borderRadius: p.$theme.sizing.scale300,
  boxShadow: p.$theme.lighting.shadow500,
  zIndex: 1000,
}))

const MapContainer = styled("div", p => ({
  height: "calc(100% - 52px)",
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
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)

  return (
    <>
      <PlacePanel selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} />
      <DistanceContainer>
        distance
        <input
          type="text"
          value={distance}
          onChange={e => dispatch(setDistance(+e.currentTarget.value))}
        />
      </DistanceContainer>
      <MapContainer>
        <Map
          places={places}
          setSelectedPlace={setSelectedPlace}
          setCoordinatinates={(lat: number, lon: number) => dispatch(setGeo({ lat, lon }))}
        />
      </MapContainer>
    </>
  )
}
