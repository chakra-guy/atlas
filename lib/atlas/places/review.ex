defmodule Atlas.Places.Review do
  use Ecto.Schema
  import Ecto.Changeset

  alias Atlas.Accounts.User
  alias Atlas.Places.Place

  schema "reviews" do
    # TODO add image attachment to reviews
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
    |> cast(attrs, [:rating, :image_url, :text, :user_id, :place_id])
    |> validate_required([:rating, :text])
  end
end
