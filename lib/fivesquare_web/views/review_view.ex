defmodule FivesquareWeb.ReviewView do
  use FivesquareWeb, :view
  alias FivesquareWeb.ReviewView

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
      user_id: review.user.id,
      place_id: review.place.id
    }
  end
end
