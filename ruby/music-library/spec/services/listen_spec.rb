describe Services::Listen do
  describe "#listen_to_track" do
    it "listens to a track" do
      artist = Artist.new("Fizz Buzz")
      album = Album.new("Foo Bar", artist)
      track = Track.new("Herp Derp", album, artist)
      artist.albums << album
      album.tracks << track

      data_store = Utilities::IdentityMap.new
      allow(data_store).to receive(:get).with(:tracks, track.name).and_return(track)
      allow(data_store).to receive(:get).with(:albums, album.name).and_return(album)
      allow(data_store).to receive(:get).with(:artists, artist.name).and_return(artist)

      previous_play_count = track.play_count

      listen_service = Services::Listen.new(data_store)
      response = listen_service.listen_to_track(track.name, album.name, artist.name)

      expect(response).to eq track
      expect(track.play_count).to eq previous_play_count + 1
    end
  end
end
