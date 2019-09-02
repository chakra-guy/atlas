defmodule FivesquareWeb.PlaceControllerTest do
  use FivesquareWeb.ConnCase

  alias Fivesquare.Places
  alias Fivesquare.Places.Place

  @create_attrs %{
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

  def fixture(:place) do
    {:ok, place} = Places.create_place(@create_attrs)
    place
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all places", %{conn: conn} do
      conn = get(conn, Routes.place_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create place" do
    test "renders place when data is valid", %{conn: conn} do
      conn = post(conn, Routes.place_path(conn, :create), place: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.place_path(conn, :show, id))

      assert %{
               "id" => id,
               "lat" => 120.5,
               "logo" => "some logo",
               "lon" => 120.5,
               "name" => "some name",
               "rating" => 120.5,
               "website" => "some website"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.place_path(conn, :create), place: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update place" do
    setup [:create_place]

    test "renders place when data is valid", %{conn: conn, place: %Place{id: id} = place} do
      conn = put(conn, Routes.place_path(conn, :update, place), place: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.place_path(conn, :show, id))

      assert %{
               "id" => id,
               "lat" => 456.7,
               "logo" => "some updated logo",
               "lon" => 456.7,
               "name" => "some updated name",
               "rating" => 456.7,
               "website" => "some updated website"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, place: place} do
      conn = put(conn, Routes.place_path(conn, :update, place), place: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete place" do
    setup [:create_place]

    test "deletes chosen place", %{conn: conn, place: place} do
      conn = delete(conn, Routes.place_path(conn, :delete, place))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.place_path(conn, :show, place))
      end
    end
  end

  defp create_place(_) do
    place = fixture(:place)
    {:ok, place: place}
  end
end
