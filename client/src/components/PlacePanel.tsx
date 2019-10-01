import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"

import { Place } from "../types"

type CustomTheme = Theme & { $isOpen: boolean }

// FIXME scroll issue
// TODO use $theme values
const Panel = styled<{ $isOpen: boolean }, "div", CustomTheme>("div", p => ({
  position: "absolute",
  zIndex: p.$theme.zIndex.modal,
  backgroundColor: p.$theme.colors.mono100,
  padding: "24px",
  borderRadius: "12px 12px 0 0",
  boxShadow: "0px -3px 14px -3px rgba(0, 0, 0, 0.8)",
  transition: `all ${p.$theme.animation.timing100} ${p.$theme.animation.easeInOutCurve}`,
  maxWidth: "320px",
  bottom: p.$isOpen ? "0" : "-120px",
  opacity: p.$isOpen ? 1 : 0,
  left: "0",
  right: "0",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "0",
  marginBottom: "0",

  // FIXME add media to theme.js and here
  "@media screen and (min-width: 1136px)": {
    width: "320px",
    left: p.$isOpen ? "0" : "-120px",
    top: "0",
    bottom: "0",
    right: "unset",
    marginLeft: "24px",
    marginRight: "0",
    marginTop: "72px",
    marginBottom: "24px",
    borderRadius: "12px",
    backgroundColor: "white",
  },
}))

type Props = {
  selectedPlace: Place | null
  setSelectedPlace: (place: Place | null) => void
}

export default function PlacePanel(props: Props) {
  const { selectedPlace } = props

  return (
    <Panel $isOpen={!!selectedPlace}>
      {<pre>{JSON.stringify(selectedPlace, undefined, 2)}</pre>}
    </Panel>
  )
}
