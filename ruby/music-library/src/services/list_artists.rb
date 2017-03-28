require_relative './service.rb'

module Services
  class ListArtists < Service
    def list_top_artists(limit)
      artist_set = @data_store.all(:artists)

      artists = []
      artist_set.each do |artist_key, artist|
        artists << artist
      end

      artists.sort_by! { |artist| -artist.play_count }
      artists.slice(0,limit)
    end
  end
end
