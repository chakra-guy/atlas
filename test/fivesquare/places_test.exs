defmodule Fivesquare.PlacesTest do
  use Fivesquare.DataCase

  alias Fivesquare.Places

  describe "places" do
    alias Fivesquare.Places.Place

    @valid_attrs %{
      lat: 120.5,
      logo: "some logo",
      lon: 120.5,
      name: "some name",
      rating: 120.5,
      website: "some website"
    }
    @update_attrs %{
      lat: 456.7,
      logo: "some updated logo",
      lon: 456.7,
      name: "some updated name",
      rating: 456.7,
      website: "some updated website"
    }
    @invalid_attrs %{lat: nil, logo: nil, lon: nil, name: nil, rating: nil, website: nil}

    def place_fixture(attrs \\ %{}) do
      {:ok, place} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Places.create_place()

      place
    end

    test "list_places/0 returns all places" do
      place = place_fixture()
      assert Places.list_places() == [place]
    end

    test "get_place!/1 returns the place with given id" do
      place = place_fixture()
      assert Places.get_place!(place.id) == place
    end

    test "create_place/1 with valid data creates a place" do
      assert {:ok, %Place{} = place} = Places.create_place(@valid_attrs)
      assert place.lat == 120.5
      assert place.logo == "some logo"
      assert place.lon == 120.5
      assert place.name == "some name"
      assert place.rating == 120.5
      assert place.website == "some website"
    end

    test "create_place/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Places.create_place(@invalid_attrs)
    end

    test "update_place/2 with valid data updates the place" do
      place = place_fixture()
      assert {:ok, %Place{} = place} = Places.update_place(place, @update_attrs)
      assert place.lat == 456.7
      assert place.logo == "some updated logo"
      assert place.lon == 456.7
      assert place.name == "some updated name"
      assert place.rating == 456.7
      assert place.website == "some updated website"
    end

    test "update_place/2 with invalid data returns error changeset" do
      place = place_fixture()
      assert {:error, %Ecto.Changeset{}} = Places.update_place(place, @invalid_attrs)
      assert place == Places.get_place!(place.id)
    end

    test "delete_place/1 deletes the place" do
      place = place_fixture()
      assert {:ok, %Place{}} = Places.delete_place(place)
      assert_raise Ecto.NoResultsError, fn -> Places.get_place!(place.id) end
    end

    test "change_place/1 returns a place changeset" do
      place = place_fixture()
      assert %Ecto.Changeset{} = Places.change_place(place)
    end
  end
end
