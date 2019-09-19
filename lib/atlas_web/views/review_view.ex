defmodule AtlasWeb.ReviewView do
  use AtlasWeb, :view
  alias AtlasWeb.ReviewView

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
      user_id: review.user_id,
      place_id: review.place_id
    }
  end
end
