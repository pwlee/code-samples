require_relative './service.rb'

module Services
  class AddTrack < Service
    def add_track(track_name, album_name, artist_name)
      artist = @data_store.get(:artists, artist_name)
      album  = artist.find_album(album_name)

      begin
        track = album.find_track(track_name)
      rescue Errors::EntityNotFound => e
        track = Track.new(track_name, album, artist)
        album.tracks << track
      end

      @data_store.put(:tracks, track_name, track)
    end
  end
end
