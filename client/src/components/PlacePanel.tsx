import React, { useState } from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import { H4, H6 } from "baseui/typography"
import { StarRating } from "baseui/rating"
import { StyledLink } from "baseui/link"
import { AspectRatioBox, AspectRatioBoxBody } from "baseui/aspect-ratio-box"
import { FormControl } from "baseui/form-control"
import { Textarea } from "baseui/textarea"
import { Button } from "baseui/button"

import { Place } from "../types"

type PanelTheme = Theme & { $isOpen: boolean }
type ContainerTheme = Theme & { $row: boolean }

const Panel = styled<{ $isOpen: boolean }, "div", PanelTheme>("div", p => ({
  position: "fixed",
  zIndex: p.$theme.zIndex.modal,
  backgroundColor: p.$theme.colors.mono100,
  padding: "0",
  borderRadius: "8px 8px 0 0",
  boxShadow: p.$theme.lighting.shadow700,
  transition: `all ${p.$theme.animation.timing100} ${p.$theme.animation.easeInOutCurve}`,
  height: "320px",
  maxWidth: "360px",
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
    height: "unset",
    width: "360px",
    left: p.$isOpen ? "0" : "-120px",
    top: "0",
    bottom: "0",
    right: "unset",
    marginLeft: p.$theme.sizing.scale800,
    marginRight: "0",
    marginTop: p.$theme.sizing.scale1600,
    marginBottom: p.$theme.sizing.scale800,
    borderRadius: "8px",
  },
}))

const PanelInside = styled("div", p => ({
  overflow: "auto",
  height: "100%",
  padding: p.$theme.sizing.scale800,
}))

const Container = styled<{ $row?: boolean }, "div", ContainerTheme>("div", p => ({
  display: "flex",
  flexDirection: p.$row ? "row" : "column",
  marginBottom: p.$theme.sizing.scale500,
}))

const HeaderContent = styled("div", p => ({
  display: "grid",
  gridGap: p.$theme.sizing.scale300,
  paddingLeft: p.$theme.sizing.scale800,
}))

const LogoOverrides = {
  Block: {
    props: {
      onLoad: () => console.log("loaded"), // FIXME
    },
    style: {
      width: "100%",
      height: "100%",
      borderRadius: "4px",
      "object-fit": "cover",
    },
  },
}

const PlaceNameOverrides = {
  Block: {
    style: {
      lineHeight: "1",
      margin: "0",
    },
  },
}

const ReviewsTitleOverrides = {
  Block: {
    style: (p: any) => ({
      margin: `${p.$theme.sizing.scale500} 0`,
    }),
  },
}

type Props = {
  selectedPlace: Place | null
  setSelectedPlace: (place: Place | null) => void
}

export default function PlacePanel(props: Props): JSX.Element {
  const { selectedPlace } = props
  const [review, setReview] = useState("")

  return (
    <Panel $isOpen={!!selectedPlace}>
      {/* FIXME dont do this, fix animation in a different way */}
      {selectedPlace && (
        <PanelInside>
          <Container $row>
            <AspectRatioBox width="scale2400">
              <AspectRatioBoxBody as="img" src={selectedPlace.logo} overrides={LogoOverrides} />
            </AspectRatioBox>
            <HeaderContent>
              <H4 overrides={PlaceNameOverrides}>{selectedPlace.name}</H4>
              <StyledLink href={selectedPlace.website} target="_blank">
                {selectedPlace.website}
              </StyledLink>
              <StarRating value={selectedPlace.rating} />
            </HeaderContent>
          </Container>
          <Container>
            <H6 overrides={ReviewsTitleOverrides}>Reviews</H6>
            <FormControl>
              <Textarea
                id="textarea-id"
                placeholder="Leave a review"
                rows={2}
                value={review}
                onChange={e => setReview(e.currentTarget.value)}
              />
            </FormControl>
            {!!review.trim() && (
              <Button size="compact" onClick={() => {}}>
                Submit Review
              </Button>
            )}
            <ul>
              <li>comment 1</li>
              <li>comment 2</li>
              <li>comment 3</li>
              <li>comment 4</li>
              <li>comment 5</li>
            </ul>
          </Container>
          {<pre style={{ overflow: "hidden" }}>{JSON.stringify(selectedPlace, undefined, 2)}</pre>}
        </PanelInside>
      )}
    </Panel>
  )
}
