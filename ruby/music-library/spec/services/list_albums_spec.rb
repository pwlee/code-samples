describe Services::ListAlbums do
  describe "#list_albums_by_artist" do
    it "lists an artist's albums" do
      artist = Artist.new("Fizz Buzz")
      artist.albums = [ Album.new("Album 1", artist), Album.new("Album 2", artist) ]

      data_store = Utilities::IdentityMap.new
      allow(data_store).to receive(:get).with(:artists, artist.name).and_return(artist)

      list_albums_service = Services::ListAlbums.new(data_store)
      response = list_albums_service.list_albums_by_artist(artist.name)

      expect(response).to eq artist.albums
    end
  end
end
