class TwitterController < ActionController::Base
  def index
    load_tweets
  end

  def load_tweets
    @tweets = $client.user_timeline
  end
end
