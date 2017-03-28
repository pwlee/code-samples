require_relative './service.rb'

module Services
  class ListTracks < Service
    def list_tracks_by_album(album_name)
      album = @data_store.get(:albums, album_name)

      album.tracks
    end

    def list_top_tracks(limit)
      track_set = @data_store.all(:tracks)

      tracks = []
      track_set.each do |track_key, track|
        tracks << track
      end

      tracks.sort_by! { |track| -track.play_count }
      tracks.slice(0,limit)
    end
  end
end
