defmodule Fivesquare.Places.Review do
  use Ecto.Schema
  import Ecto.Changeset

  alias Fivesquare.Accounts.User
  alias Fivesquare.Places.Place

  schema "reviews" do
    field :image_url, :string
    field :rating, :integer
    field :text, :string
    
    belongs_to :user, User
    belongs_to :place, Place

    timestamps()
  end

  @doc false
  def changeset(review, attrs) do
    review
    |> cast(attrs, [:rating, :text, :image_url, :user_id, :place_id])
    |> validate_required([:rating, :text])
  end
end
