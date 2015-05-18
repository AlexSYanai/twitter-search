require 'rails_helper'

describe TwitterHelper do
  describe "format date" do
    before :each do
      @t = Time.new(2015,05,16,14,5,6,'+03:00')
    end
    it "returns a date in the correct format" do
      expect(format_date(@t)).to eq("02:05 PM - 16 May 15")
    end
  end

  describe "parse word files" do
    before :each do
      parse_word_files
    end

    it "should create and array of positive words" do
      expect(@positive_words.empty?).to be false
    end
    it "should create and array of negative words" do
      expect(@negative_words.empty?).to be false
    end
  end

  describe "analyze sentiment" do
    before :each do
      parse_word_files
    end

    it "should return the correct sum for a given tweet" do
      tweet = "celebrate coolest work"
      expect(analyze_sentiment(tweet)).to eq("3")
    end

    it "should return correct sum if words from both lists are present" do
      tweet = "celebrate hard work"
      expect(analyze_sentiment(tweet)).to eq("1")
    end
  end
end
