defmodule Fivesquare.Places do
  import Ecto.Query, warn: false
  alias Fivesquare.Repo

  alias Fivesquare.Places.Place

  defmacro distance_between(a_lon, a_lat, b_lon, b_lat) do
    quote do
      fragment(
        "ST_Distance_Sphere(ST_MakePoint(?,?), ST_MakePoint(?,?))",
        unquote(a_lon),
        unquote(a_lat),
        unquote(b_lon),
        unquote(b_lat)
      )
    end
  end

  # Returns the list of places based on the geolocation and distance.
  def list_places(%{"lat" => lat, "lon" => lon, "distance" => distance}) do
    safeLat = String.to_float(lat)
    safeLon = String.to_float(lon)
    safeDis = String.to_integer(distance)

    Repo.all(
      from p in Place,
        where: distance_between(p.lon, p.lat, ^safeLon, ^safeLat) <= ^safeDis
    )
  end

  def list_places do
    Repo.all(Place)
  end

  def get_place!(id) do
    Repo.get!(Place, id)
  end

  def create_place(attrs \\ %{}) do
    %Place{}
    |> Place.changeset(attrs)
    |> Repo.insert()
  end

  def update_place(%Place{} = place, attrs) do
    place
    |> Place.changeset(attrs)
    |> Repo.update()
  end

  def delete_place(%Place{} = place) do
    Repo.delete(place)
  end

  def get_place_changeset(%Place{} = place) do
    Place.changeset(place, %{})
  end
end
