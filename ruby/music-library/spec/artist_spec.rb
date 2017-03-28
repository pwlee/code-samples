describe Artist do
  subject { Artist.new("name") }

  it { should respond_to :name }
  it { should respond_to :albums }

  let(:albums) { [Album.new("Album 1", nil), Album.new("Album 2", nil)] }

  describe "#initialize" do
    it "initializes an artist with a name, and album list" do
      expect(subject.name).to eq "name"
      expect(subject.albums).to eq []
    end
  end

  describe "#play_count" do
    it "sums the play counts of all its albums" do
      allow(albums[0]).to receive(:play_count).and_return(5)
      allow(albums[1]).to receive(:play_count).and_return(19)
      allow(subject).to receive(:albums).and_return(albums)

      expect(subject.play_count).to eq 24
    end
  end

  describe "#find_album" do
    it "finds and returns an album by this artist based on album name" do
      allow(subject).to receive(:albums).and_return(albums)
      expect(subject.find_album("Album 2")).to eq albums.last
    end

    it "raises an EntityNotFound error when it doesn't find a track" do
      allow(subject).to receive(:albums).and_return(albums)
      expect{ subject.find_album("Noooope") }.to raise_error Errors::EntityNotFound
    end
  end

  describe "#to_s" do
    it "displays the name and play count" do
      allow(subject).to receive(:play_count).and_return(5)
      expect(subject.to_s).to eq "name (5 plays)"
    end
  end
end
