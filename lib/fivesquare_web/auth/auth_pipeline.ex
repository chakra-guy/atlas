defmodule FivesquareWeb.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :fivesquare,
    module: FivesquareWeb.Guardian,
    error_handler: FivesquareWeb.Guardian.AuthErrorHandler

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
end
