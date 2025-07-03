require "test_helper"

class Api::RoutesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_routes_create_url
    assert_response :success
  end
end
