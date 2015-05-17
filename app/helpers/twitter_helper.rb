module TwitterHelper
  def word_lists
    @positive_words = []
    @negative_words = []
  end

  def parse_media(tweet)
    tweet.media[0].media_url if tweet.media.any?
  end

  def format_date(date_string)      # Formats created-at in keeping with Twitter's style
    date_string.strftime("%I:%M %p - %d %b %y")
  end

  def parse_word_files              # Parses the word-sentiment lists
    word_lists
    File.open("#{Rails.root}/app/models/positive_words.txt").each_line { |line| @positive_words << line.chomp }
    File.open("#{Rails.root}/app/models/negative_words.txt").each_line { |line| @negative_words << line.chomp }
  end

  def analyze_sentiment(tweet_body) # Initially strips away characters not found in the word list
    score = 0                       # Splits each tweet body and searches it against both lists
    tweet_body.gsub(/[^\s\w*-@]/,"").split(" ").each do |word|
      score += 1 if @positive_words.include?(word)
      score -= 1 if @negative_words.include?(word)
    end
    score.to_s
  end
end
