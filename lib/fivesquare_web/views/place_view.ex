defmodule FivesquareWeb.PlaceView do
  use FivesquareWeb, :view
  alias FivesquareWeb.PlaceView

  def render("index.json", %{places: places}) do
    %{data: render_many(places, PlaceView, "place.json")}
  end

  def render("show.json", %{place: place}) do
    %{data: render_one(place, PlaceView, "place.json")}
  end

  def render("place.json", %{place: place}) do
    %{id: place.id,
      name: place.name,
      rating: place.rating,
      logo: place.logo,
      website: place.website,
      lat: place.lat,
      lon: place.lon}
  end
end
