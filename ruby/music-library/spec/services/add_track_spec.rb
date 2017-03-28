describe Services::AddTrack do
  describe "#add_track" do
    it "adds an track to a data store" do
      track_name, album_name, artist_name = "Herp Derp", "Fizz Buzz", "Foo Bar"

      artist = Artist.new(artist_name)
      album  = Album.new(album_name, artist)
      artist.albums << album
      data_store = Utilities::IdentityMap.new
      allow(data_store).to receive(:get).with(:artists, artist_name).and_return(artist)
      allow(data_store).to receive(:get).with(:albums, album_name).and_return(album)
      allow(data_store).to receive(:put).and_call_original

      add_track_service = Services::AddTrack.new(data_store)
      track = add_track_service.add_track(track_name, album_name, artist_name)

      expect(data_store).to have_received(:put)
      expect(track.name).to eq track_name
      expect(track.album).to eq album
      expect(track.artist).to eq artist
    end
  end
end
