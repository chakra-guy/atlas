import React, { useState, useEffect, useMemo } from "react"
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
import { dispatch } from "../action$"
import { fetchReviews } from "../actions/place"
import Review from "./Review"

type PanelTheme = Theme & { $isOpen: boolean }

const Panel = styled<{ $isOpen: boolean }, "div", PanelTheme>("div", p => ({
  bottom: p.$isOpen ? "0" : "-120px",
  opacity: p.$isOpen ? 1 : 0,
  pointerEvents: p.$isOpen ? "all" : "none",

  position: "fixed",
  zIndex: p.$theme.zIndex.modal,
  backgroundColor: p.$theme.colors.mono100,
  padding: "0",
  borderRadius: "8px 8px 0 0",
  boxShadow: p.$theme.lighting.shadow700,
  transition: `all ${p.$theme.animation.timing100} ${p.$theme.animation.easeInOutCurve}`,
  height: "320px",
  maxWidth: "360px",
  left: "0",
  right: "0",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "0",
  marginBottom: "0",

  // FIXME add media to theme.js and here
  "@media screen and (min-width: 1136px)": {
    left: p.$isOpen ? "0" : "-120px",

    height: "unset",
    width: "360px",
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
  height: `calc(100% - ${p.$theme.sizing.scale1200})`,
  padding: p.$theme.sizing.scale800,
}))

type ContainerTheme = Theme & { $row: boolean }

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
  places: Place[]
  placeID: number | null
}

export default function PlacePanel(props: Props): JSX.Element {
  const { places, placeID } = props

  const [review, setReview] = useState("")

  const place = useMemo(() => places.find(p => p.id === placeID), [places, placeID])

  useEffect(() => {
    if (placeID) dispatch(fetchReviews(placeID))
  }, [placeID])

  return (
    <Panel $isOpen={!!place}>
      {/* FIXME dont do this, fix animation in a different way */}
      {place && (
        <PanelInside>
          <Container $row>
            <AspectRatioBox width="scale2400">
              <AspectRatioBoxBody as="img" src={place.logo} overrides={LogoOverrides} />
            </AspectRatioBox>
            <HeaderContent>
              <H4 overrides={PlaceNameOverrides}>{place.name}</H4>
              <StyledLink href={place.website} target="_blank">
                {place.website}
              </StyledLink>
              <StarRating value={place.rating} />
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
            {place.reviews && place.reviews.map(Review)}
          </Container>
          {<pre style={{ overflow: "hidden" }}>{JSON.stringify(place, undefined, 2)}</pre>}
        </PanelInside>
      )}
    </Panel>
  )
}
