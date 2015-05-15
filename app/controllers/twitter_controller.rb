class TwitterController < ActionController::Base
  include TwitterHelper

  def index
  end

  def create
    parse_word_files if @positive_words.nil?
    user_name = params["name"]
    respond_to do |format|
      load_tweets(user_name)
      format.json {
        render json: {:info => @final_info}
      }
    end
  end

  def load_tweets(user_name)
    user = $client.user(user_name)
    tweet = $client.user_timeline(user_name,include_rts: false).take(6)
    @final_info = parse_tweets(tweet) + parse_user(user)
  end

  private
  def parse_user(user)
    info = {
      username: user.screen_name.to_s,
      full_name: user.name.to_s,
      tweets: user.statuses_count,
      favorites: user.favorites_count,
      followers: user.followers_count,
      friends: user.friends_count,
      description: user.description.to_s,
      prof_pic: user.profile_image_url_https.to_s,
      location: user.location.to_s,
      user_score: @tweet_sentiment + user.followers_count,
      background: user.profile_background_image_url_https.to_s }.to_json
    end

  def parse_tweets(tweets)
    tweets_info = tweets.map do |tweet|
      { date: format_date(tweet.created_at.to_s),
        retweets: tweet.retweet_count,
        body: tweet.text.to_s,
        sentiment: analyze_sentiment(tweet.text) }
    end
  @tweet_sentiment = tweets_info.map { |n| n[:sentiment] }.inject(:+)
  tweets_info.to_json
  end
end
