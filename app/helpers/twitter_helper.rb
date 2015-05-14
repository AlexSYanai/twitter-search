module TwitterHelper
  def parse_user(user)
  info = {
    username: user.screen_name.to_s,
    full_name: user.name.to_s,
    tweets: user.statuses_count.to_s,
    favorites: user.favorites_count.to_s,
    followers: user.followers_count.to_s,
    friends: user.friends_count.to_s,
    description: user.description.to_s,
    prof_pic: user.profile_image_url_https.to_s,
    location: user.location.to_s,
    background: user.profile_background_image_url_https.to_s }.to_json
  end

  def parse_tweets()

  end
end
