require_relative './service.rb'

module Services
  class AddArtist < Service
    def add_artist(artist_name)
      artist = Artist.new(artist_name)

      @data_store.put(:artists, artist_name, artist)
    end
  end
end
