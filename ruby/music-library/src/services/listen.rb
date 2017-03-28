require_relative './service.rb'

module Services
  class Listen < Service
    def listen_to_track(track_name, album_name, artist_name)
      artist = @data_store.get(:artists, artist_name)

      album = artist.find_album(album_name)
      track = album.find_track(track_name)

      track.play_count += 1
      track
    end
  end
end
