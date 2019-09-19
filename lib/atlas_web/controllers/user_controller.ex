defmodule AtlasWeb.UserController do
  use AtlasWeb, :controller

  alias Atlas.Accounts
  alias Atlas.Accounts.User

  alias AtlasWeb.SessionView
  alias AtlasWeb.Guardian

  action_fallback AtlasWeb.FallbackController

  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    case Accounts.signup_user(user_params) do
      {:ok, %User{} = user} ->
        {:ok, jwt, _claims} = Guardian.encode_and_sign(user)

        conn
        |> put_status(:created)
        |> put_view(SessionView)
        |> render( "show.json", %{jwt: jwt, user: user})

      {:error, _reason} ->
        conn
        |> put_status(:unprocessable_entity)
        |> put_view(SessionView)
        |> render("error.json")
    end
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{}} <- Accounts.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
