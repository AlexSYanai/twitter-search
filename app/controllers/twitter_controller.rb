class TwitterController < ActionController::Base
  include TwitterHelper
  
  def index
    load_tweets
  end

  def load_tweets
    user = $client.user('AlexSYanai')
    @user_info = parse_user(user)
  end
end
