class Track
  attr_accessor :name, :album, :artist, :play_count

  def initialize(name, album, artist)
    @name = name
    @album = album
    @artist = artist
    @play_count = 0
  end

  def to_s
    "#{@name} (#{@play_count} plays)"
  end
end
