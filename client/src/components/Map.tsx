import React, { useState } from "react"
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl"

import { Place } from "../types"
import { useEventCallback } from "rxjs-hooks"
import { debounceTime, tap, ignoreElements } from "rxjs/operators"
import { dispatch } from "../action$"
import { setGeo } from "../actions/map"

const Mapbox = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "" })

type Props = {
  places: Place[]
  setSelectedPlaceID: (place_id: number | null) => void
}

type mapboxType = {
  center: [number, number]
  zoom: [number]
}

export default function Map({ places, setSelectedPlaceID }: Props): JSX.Element {
  const [mapbox] = useState<mapboxType>({
    zoom: [16],
    center: [19.05465, 47.4979],
  })

  const [setCoordinatinates] = useEventCallback(geo$ =>
    geo$.pipe(
      debounceTime(250),
      tap(geo => dispatch(setGeo(geo))),
      ignoreElements(),
    ),
  )

  const handleHover = (cursor: string) => ({ map }: any) => {
    map.getCanvas().style.cursor = cursor
  }

  const handleDrag = (map: any) => {
    const { lng, lat } = map.getCenter()
    setCoordinatinates({ lng, lat })
  }

  return (
    <Mapbox
      zoom={mapbox.zoom}
      center={mapbox.center}
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{ height: "100%", width: "100%" }}
      onClick={() => setSelectedPlaceID(null)}
      onDrag={handleDrag}
    >
      <Layer type="symbol" id="marker" layout={{ "icon-image": "circle-15" }}>
        {places.map(place => (
          <Feature
            key={place.id}
            coordinates={[place.lng, place.lat]}
            onClick={() => setSelectedPlaceID(place.id)}
            onMouseEnter={handleHover("pointer")}
            onMouseLeave={handleHover("")}
          />
        ))}
      </Layer>
    </Mapbox>
  )
}
