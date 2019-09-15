defmodule FivesquareWeb.SessionController do
  use FivesquareWeb, :controller

  alias Fivesquare.Accounts
  alias Fivesquare.Accounts.User

  alias FivesquareWeb.Guardian

  def create(conn, %{"credentials" => %{"username" => username, "password" => password}}) do
    case Accounts.authenticate(username, password) do
      {:ok, %User{} = user} ->
        {:ok, jwt, _claims} = Guardian.encode_and_sign(user)

        conn
        |> put_status(:created)
        |> render("show.json", %{jwt: jwt, user: user})

      {:error, _reason} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json")
    end
  end
end
