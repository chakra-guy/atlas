defmodule AtlasWeb.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :atlas,
    module: AtlasWeb.Guardian,
    error_handler: AtlasWeb.Guardian.AuthErrorHandler

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
end
