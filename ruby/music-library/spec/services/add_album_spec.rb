describe Services::AddAlbum do
  describe "#add_album" do
    it "adds an album to a data store" do
      album_name, artist_name = "Fizz Buzz", "Foo Bar"
      artist = Artist.new(artist_name)

      data_store = Utilities::IdentityMap.new
      allow(data_store).to receive(:get).with(:artists, artist_name).and_return(artist)
      allow(data_store).to receive(:put).and_call_original

      add_album_service = Services::AddAlbum.new(data_store)
      album = add_album_service.add_album(album_name, artist_name)

      expect(data_store).to have_received(:put)
      expect(album.name).to eq album_name
      expect(album.artist).to eq artist
      expect(artist.albums).to include album
    end
  end
end
