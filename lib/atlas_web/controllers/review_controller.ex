defmodule AtlasWeb.ReviewController do
  use AtlasWeb, :controller

  alias Atlas.Places
  alias Atlas.Places.Review

  action_fallback AtlasWeb.FallbackController

  def index(conn, %{"review" => %{"user_id" => user_id, "place_id" => place_id}}) do
    reviews = Places.list_reviews_by_user_and_place(user_id, place_id)
    render(conn, "index.json", reviews: reviews)
  end

  def index(conn, %{"review" => %{"place_id" => place_id}}) do
    reviews = Places.list_reviews_by_place(place_id)
    render(conn, "index.json", reviews: reviews)
  end

  def index(conn, _params) do
    reviews = Places.list_reviews()
    render(conn, "index.json", reviews: reviews)
  end

  def create(conn, %{"review" => review_params}) do
    with {:ok, %Review{} = review} <- Places.create_review(review_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.review_path(conn, :show, review))
      |> render("show.json", review: review)
    end
  end

  def show(conn, %{"id" => id}) do
    review = Places.get_review!(id)
    render(conn, "show.json", review: review)
  end

  def update(conn, %{"id" => id, "review" => review_params}) do
    review = Places.get_review!(id)

    with {:ok, %Review{} = review} <- Places.update_review(review, review_params) do
      render(conn, "show.json", review: review)
    end
  end

  def delete(conn, %{"id" => id}) do
    review = Places.get_review!(id)

    with {:ok, %Review{}} <- Places.delete_review(review) do
      send_resp(conn, :no_content, "")
    end
  end
end
