import React, { useState } from "react"
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl"

import { Place } from "../types"
import { useEventCallback } from "rxjs-hooks"
import { debounceTime, tap, ignoreElements } from "rxjs/operators"
import { dispatch } from "../action$"
import { setGeo } from "../actions/map"

const Mapbox = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "" })

type Props = {
  places: Place[]
  setSelectedPlace: (place: Place | null) => void
}

type mapPropsType = {
  center: [number, number]
  zoom: [number]
}

export default function Map({ places, setSelectedPlace }: Props): JSX.Element {
  const [mapProps] = useState<mapPropsType>({
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

  return (
    <Mapbox
      zoom={mapProps.zoom}
      center={mapProps.center}
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{ height: "100vh", width: "100vw" }}
      onClick={() => setSelectedPlace(null)}
      onDrag={map => {
        const { lng, lat } = map.getCenter()
        setCoordinatinates({ lat: lat, lon: lng })
      }}
    >
      <Layer type="symbol" id="marker" layout={{ "icon-image": "circle-15" }}>
        {places.map(place => (
          <Feature
            key={place.id}
            coordinates={[place.lon, place.lat]}
            onClick={() => setSelectedPlace(place)}
            onMouseEnter={handleHover("pointer")}
            onMouseLeave={handleHover("")}
          />
        ))}
      </Layer>
    </Mapbox>
  )
}
