class TwitterController < ActionController::Base
  include TwitterHelper

  def index
    parse_word_files if @positive_words.nil?
    load_tweets
  end

  def load_tweets
    user = $client.user('AlexSYanai')
    tweet = $client.user_timeline('AlexSYanai',include_rts: false).take(2)
    @user_info = parse_user(user)
    @tweet_info = parse_tweets(tweet)
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
      background: user.profile_background_image_url_https.to_s }.to_json
  end

  def parse_tweets(tweets)
    tweets_info = tweets.map do |tweet|
      { date: format_date(tweet.created_at.to_s),
        retweets: tweet.retweet_count,
        body: tweet.text.to_s,
        sentiment: analyze_sentiment(tweet.text) }
    end
    tweets_info.to_json
  end
end
