module TwitterHelper
  def format_date(date_string)
    t = Time.new(date_string)
    t.strftime("%I:%M %p - %d %b %y")
  end
end
