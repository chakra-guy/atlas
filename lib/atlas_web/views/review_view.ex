defmodule AtlasWeb.ReviewView do
  use AtlasWeb, :view
  alias AtlasWeb.{ReviewView, UserView}

  def render("index.json", %{reviews: reviews}) do
    %{data: render_many(reviews, ReviewView, "review.json")}
  end

  def render("show.json", %{review: review}) do
    %{data: render_one(review, ReviewView, "review.json")}
  end

  def render("review.json", %{review: review}) do
    %{
      id: review.id,
      image_url: review.image_url,
      rating: review.rating,
      text: review.text,
      place_id: review.place_id,
      user: render_one(review.user, UserView, "user.json")
    }
  end
end
