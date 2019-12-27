defmodule Atlas.Places.Place do
  use Ecto.Schema
  import Ecto.Changeset

  alias Atlas.Places.Review

  schema "places" do
    field :name, :string
    field :rating, :float
    field :logo, :string
    field :website, :string
    field :lat, :float
    field :lng, :float
    field :geohash, :string

    has_many :review, Review

    timestamps()
  end

  @doc false
  def changeset(place, attrs) do
    place
    |> cast(attrs, [:name, :rating, :logo, :website, :lat, :lng, :geohash])
    |> validate_required([:name])
  end
end
