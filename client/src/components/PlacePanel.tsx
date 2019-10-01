import React from "react"
import { Place } from "../types"

type Props = {
  places: Place[]
}

export default function PlacePanel(props: Props) {
  const { places } = props
  console.log("places", places)

  return <div>place</div>
}
