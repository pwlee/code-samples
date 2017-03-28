describe Services::ListArtists do
  let (:data_store)           { Utilities::IdentityMap.new }
  let (:list_artists_service) { Services::ListArtists.new(data_store) }

  describe "#list_top_artists" do
    it "lists the top X artists by play count" do
      artists = {
        artist_1: Artist.new("Artist 1"),
        artist_2: Artist.new("Artist 2"),
        artist_3: Artist.new("Artist 3")
      }

      allow(artists[:artist_1]).to receive(:play_count).and_return(2500)
      allow(artists[:artist_2]).to receive(:play_count).and_return(2790)
      allow(artists[:artist_3]).to receive(:play_count).and_return(10)

      allow(data_store).to receive(:all).with(:artists).and_return(artists)

      expect(list_artists_service.list_top_artists(2)).to eq [artists[:artist_2], artists[:artist_1]]
    end
  end
end
