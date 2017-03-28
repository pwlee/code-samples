require_relative './service.rb'

module Services
  class ListAlbums < Service
    def list_albums_by_artist(artist_name)
      artist = @data_store.get(:artists, artist_name)
      artist.albums
    end
  end
end
