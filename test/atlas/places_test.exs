defmodule Atlas.PlacesTest do
  use Atlas.DataCase

  alias Atlas.Places

  describe "places" do
    alias Atlas.Places.Place

    @valid_attrs %{
      lat: 120.5,
      logo: "some logo",
      lng: 120.5,
      name: "some name",
      rating: 120.5,
      website: "some website"
    }
    @update_attrs %{
      lat: 456.7,
      logo: "some updated logo",
      lng: 456.7,
      name: "some updated name",
      rating: 456.7,
      website: "some updated website"
    }
    @invalid_attrs %{lat: nil, logo: nil, lng: nil, name: nil, rating: nil, website: nil}

    def place_fixture(attrs \\ %{}) do
      {:ok, place} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Places.create_place()

      place
    end

    @tag :skip
    test "list_places/0 returns all places" do
      place = place_fixture()
      assert Places.list_places() == [place]
    end

    @tag :skip
    test "get_place!/1 returns the place with given id" do
      place = place_fixture()
      assert Places.get_place!(place.id) == place
    end

    @tag :skip
    test "create_place/1 with valid data creates a place" do
      assert {:ok, %Place{} = place} = Places.create_place(@valid_attrs)
      assert place.lat == 120.5
      assert place.logo == "some logo"
      assert place.lng == 120.5
      assert place.name == "some name"
      assert place.rating == 120.5
      assert place.website == "some website"
    end

    @tag :skip
    test "create_place/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Places.create_place(@invalid_attrs)
    end

    @tag :skip
    test "update_place/2 with valid data updates the place" do
      place = place_fixture()
      assert {:ok, %Place{} = place} = Places.update_place(place, @update_attrs)
      assert place.lat == 456.7
      assert place.logo == "some updated logo"
      assert place.lng == 456.7
      assert place.name == "some updated name"
      assert place.rating == 456.7
      assert place.website == "some updated website"
    end

    @tag :skip
    test "update_place/2 with invalid data returns error changeset" do
      place = place_fixture()
      assert {:error, %Ecto.Changeset{}} = Places.update_place(place, @invalid_attrs)
      assert place == Places.get_place!(place.id)
    end

    @tag :skip
    test "delete_place/1 deletes the place" do
      place = place_fixture()
      assert {:ok, %Place{}} = Places.delete_place(place)
      assert_raise Ecto.NoResultsError, fn -> Places.get_place!(place.id) end
    end

    @tag :skip
    test "get_place_changeset/1 returns a place changeset" do
      place = place_fixture()
      assert %Ecto.Changeset{} = Places.get_place_changeset(place)
    end
  end

  describe "reviews" do
    alias Atlas.Places.Review

    @valid_attrs %{image_url: "some image_url", rating: 42, text: "some text"}
    @update_attrs %{image_url: "some updated image_url", rating: 43, text: "some updated text"}
    @invalid_attrs %{image_url: nil, rating: nil, text: nil}

    def review_fixture(attrs \\ %{}) do
      {:ok, review} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Places.create_review()

      review
    end

    @tag :skip
    test "list_reviews/0 returns all reviews" do
      review = review_fixture()
      assert Places.list_reviews() == [review]
    end

    @tag :skip
    test "get_review!/1 returns the review with given id" do
      review = review_fixture()
      assert Places.get_review!(review.id) == review
    end

    @tag :skip
    test "create_review/1 with valid data creates a review" do
      assert {:ok, %Review{} = review} = Places.create_review(@valid_attrs)
      assert review.image_url == "some image_url"
      assert review.rating == 42
      assert review.text == "some text"
    end

    @tag :skip
    test "create_review/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Places.create_review(@invalid_attrs)
    end

    @tag :skip
    test "update_review/2 with valid data updates the review" do
      review = review_fixture()
      assert {:ok, %Review{} = review} = Places.update_review(review, @update_attrs)
      assert review.image_url == "some updated image_url"
      assert review.rating == 43
      assert review.text == "some updated text"
    end

    @tag :skip
    test "update_review/2 with invalid data returns error changeset" do
      review = review_fixture()
      assert {:error, %Ecto.Changeset{}} = Places.update_review(review, @invalid_attrs)
      assert review == Places.get_review!(review.id)
    end

    @tag :skip
    test "delete_review/1 deletes the review" do
      review = review_fixture()
      assert {:ok, %Review{}} = Places.delete_review(review)
      assert_raise Ecto.NoResultsError, fn -> Places.get_review!(review.id) end
    end

    @tag :skip
    test "change_review/1 returns a review changeset" do
      review = review_fixture()
      assert %Ecto.Changeset{} = Places.change_review(review)
    end
  end
end
