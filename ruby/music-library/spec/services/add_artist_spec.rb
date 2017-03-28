describe Services::AddArtist do
  describe "#add_artist" do
    it "adds an artist to a data store" do
      data_store = Utilities::IdentityMap.new
      allow(data_store).to receive(:put).and_call_original

      add_artist_service = Services::AddArtist.new(data_store)
      artist = add_artist_service.add_artist("Fizz Buzz")

      expect(data_store).to have_received(:put)
      expect(artist.name).to eq "Fizz Buzz"
    end
  end
end
