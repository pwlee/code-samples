describe Track do
  subject { Track.new("name", "album", "artist") }

  it { should respond_to :name }
  it { should respond_to :album }
  it { should respond_to :artist }
  it { should respond_to :play_count }

  describe "#initialize" do
    it "initializes an album with a name, album, and artist" do
      expect(subject.name).to eq "name"
      expect(subject.album).to eq "album"
      expect(subject.artist).to eq "artist"
      expect(subject.play_count).to eq 0
    end
  end

  describe "#to_s" do
    it "displays the name and play count" do
      expect(subject.to_s).to eq "name (0 plays)"
    end
  end
end
