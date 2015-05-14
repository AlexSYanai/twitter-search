module TwitterHelper
  def word_lists
    @positive_words = []
    @negative_words = []
  end

  def format_date(date_string)
    Time.new(date_string).strftime("%I:%M %p - %d %b %y")
  end

  def parse_word_files
    word_lists
    File.open("#{Rails.root}/app/models/positive_words.txt").each_line { |line| @positive_words << line.chomp }
    File.open("#{Rails.root}/app/models/negative_words.txt").each_line { |line| @negative_words << line.chomp }
  end

  def analyze_sentiment(tweet_body)
    score = 0
    tweet_body.gsub(/[^\s\w*-@]/,"").split(" ").each do |word|
      score += 1 if @positive_words.include?(word)
      score -= 1 if @negative_words.include?(word)
    end
    score
  end
end
