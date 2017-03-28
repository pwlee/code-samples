class Album
  attr_accessor :name, :artist, :tracks

  def initialize(name, artist)
    @name = name
    @artist = artist
    @tracks = []
  end

  def play_count
    tracks.reduce(0) { |sum, track| sum + track.play_count }
  end

  def find_track(track_name)
    track = tracks.find { |track| track.name == track_name }

    if !track
      raise Errors::EntityNotFound.new("Track not found")
    end

    track
  end

  def to_s
    "#{@name} (#{play_count} plays)"
  end
end
