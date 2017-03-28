require_relative './service.rb'

module Services
  class AddAlbum < Service
    def add_album(album_name, artist_name)
      artist = @data_store.get(:artists, artist_name)

      album = Album.new(album_name, artist)
      artist.albums << album

      @data_store.put(:albums, album_name, album)
    end
  end
end
