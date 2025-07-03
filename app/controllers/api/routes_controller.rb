class Api::RoutesController < ApplicationController
  # POST /api/routes
  def create
    country_codes_param = params[:country_codes]

    if country_codes_param.blank?
      render json: { error: "Input boş olamaz." }, status: :unprocessable_entity # 422
      return
    end

    unless country_codes_param.is_a?(String) && country_codes_param.match?(/^[A-Z]{2}(-[A-Z]{2})*$/)
      render json: { error: "Geçersiz input formatı. Örnek: TR-BG-DE" }, status: :bad_request # 400
      return
    end

    codes = country_codes_param.split('-').map(&:upcase)
    route = []

    codes.each do |code|
      country = Country.find_by(code: code)
      if country.nil?
        render json: { error: "Geçersiz ülke kodu: #{code}" }, status: :not_found # 404
        return
      end
      route << { lat: country.latitude, lng: country.longitude, country: country.code }
    end

    render json: { route: route }, status: :ok # 200
  end
end
