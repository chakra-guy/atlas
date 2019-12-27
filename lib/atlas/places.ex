defmodule Atlas.Places do
  import Ecto.Query, warn: false
  
  alias Atlas.Repo
  alias Atlas.Places.Place
  alias Atlas.Places.Review

  defmacro distance_between(a_lng, a_lat, b_lng, b_lat) do
    quote do
      fragment(
        "ST_Distance(ST_MakePoint(?,?), ST_MakePoint(?,?), true)",
        unquote(a_lng),
        unquote(a_lat),
        unquote(b_lng),
        unquote(b_lat)
      )
    end
  end

  # PLACES

  # Returns the list of places based on the geolocation and distance.
  def list_places(%{"lng" => lng, "lat" => lat, "distance" => distance}) do
    safelng = String.to_float(lng)
    safeLat = String.to_float(lat)
    safeDis = String.to_integer(distance)

    Repo.all(
      from p in Place,
        where: distance_between(p.lng, p.lat, ^safelng, ^safeLat) <= ^safeDis
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

  # REVIEWS

  def list_reviews do
    Repo.all(Review)
  end

  def list_reviews_by_user_and_place(user_id, place_id) do
    query =
      from r in Review,
        left_join: u in assoc(r, :user),
        left_join: p in assoc(r, :place),
        where: u.id == ^user_id and p.id == ^place_id,
        select: r

    query
    |> Repo.all()
    |> Repo.preload([:user])
  end

  def list_reviews_by_place(place_id) do
    query =
      from r in Review,
        left_join: p in assoc(r, :place),
        where: p.id == ^place_id,
        select: r

    query
    |> Repo.all()
    |> Repo.preload([:user])
  end

  def get_review!(id) do
    Repo.get!(Review, id)
  end

  def get_review_by(params \\ %{}) do
    Repo.get_by(Review, params)
  end

  def create_review(attrs \\ %{}) do
    %Review{}
    |> Review.changeset(attrs)
    |> Repo.insert()
  end

  def update_review(%Review{} = review, attrs) do
    review
    |> Review.changeset(attrs)
    |> Repo.update()
  end

  def delete_review(%Review{} = review) do
    Repo.delete(review)
  end

  def get_review_changeset(%Review{} = review) do
    Review.changeset(review, %{})
  end
end
