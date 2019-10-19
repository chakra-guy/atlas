import React, { useState } from "react"
import { pluck, distinctUntilChanged } from "rxjs/operators"
import { styled } from "baseui"
import { useObservable } from "rxjs-hooks"

import store$ from "../store$"
import { dispatch } from "../action$"
import { setDistance } from "../actions/map"
import { Map, PlacePanel } from "../components"
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
  height: "calc(100% - 48px)",
  width: "100%",
  backgroundColor: p.$theme.colors.mono100,
}))

const view$ = store$.pipe(
  pluck("map"),
  distinctUntilChanged(),
)

const initialValues = {
  distance: 750,
  places: [],
}

export default function Mainpage() {
  const { distance, places } = useObservable(() => view$, initialValues)
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
        <Map places={places} setSelectedPlace={setSelectedPlace} />
      </MapContainer>
    </>
  )
}
