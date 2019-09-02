defmodule Fivesquare.Places.Place do
  use Ecto.Schema
  import Ecto.Changeset

  schema "places" do
    field :lat, :float
    field :logo, :string
    field :lon, :float
    field :name, :string
    field :rating, :float
    field :website, :string

    timestamps()
  end

  @doc false
  def changeset(place, attrs) do
    place
    |> cast(attrs, [:name, :rating, :logo, :website, :lat, :lon])
    |> validate_required([:name, :rating, :logo, :website, :lat, :lon])
  end
end
