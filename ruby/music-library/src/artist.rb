class Artist
  attr_accessor :name, :albums

  def initialize(name)
    @name = name
    @albums = []
  end

  def play_count
    albums.reduce(0) { |sum, album| sum + album.play_count }
  end

  def find_album(album_name)
    album = albums.find { |album| album.name == album_name }

    if !album
      raise Errors::EntityNotFound.new("Album not found")
    end

    album
  end

  def to_s
    "#{@name} (#{play_count} plays)"
  end
end
