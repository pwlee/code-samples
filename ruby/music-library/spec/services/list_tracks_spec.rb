describe Services::ListTracks do
  let (:data_store)          { Utilities::IdentityMap.new }
  let (:list_tracks_service) { Services::ListTracks.new(data_store) }

  describe "#list_tracks_by_album" do
    it "lists an album's tracks" do
      artist = Artist.new("Fizz Buzz")
      album  = Album.new("Album 1", artist)
      tracks = [Track.new("Track 1", album, artist), Track.new("Track 2", album, artist)]

      artist.albums << album
      album.tracks = tracks

      allow(data_store).to receive(:get).with(:albums, album.name).and_return(album)

      response = list_tracks_service.list_tracks_by_album(album.name)

      expect(response).to eq tracks
    end
  end

  describe "#list_top_tracks" do
    it "lists the top X tracks by play count" do
      tracks = {
        track_1: Track.new("Track 1", nil, nil),
        track_2: Track.new("Track 2", nil, nil),
        track_3: Track.new("Track 3", nil, nil)
      }

      allow(tracks[:track_1]).to receive(:play_count).and_return(100)
      allow(tracks[:track_2]).to receive(:play_count).and_return(98)
      allow(tracks[:track_3]).to receive(:play_count).and_return(17)

      allow(data_store).to receive(:all).with(:tracks).and_return(tracks)

      expect(list_tracks_service.list_top_tracks(2)).to eq [tracks[:track_1], tracks[:track_2]]
    end
  end
end
