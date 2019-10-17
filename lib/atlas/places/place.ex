defmodule Atlas.Places.Place do
  use Ecto.Schema
  import Ecto.Changeset

  alias Atlas.Places.Review

  schema "places" do
    field :lat, :float
    field :logo, :string
    field :lon, :float
    field :name, :string
    field :rating, :float
    field :website, :string

    has_many :review, Review

    timestamps()
  end

  @doc false
  def changeset(place, attrs) do
    place
    |> cast(attrs, [:name, :rating, :logo, :website, :lat, :lon])
    |> validate_required([:name])
  end
end
