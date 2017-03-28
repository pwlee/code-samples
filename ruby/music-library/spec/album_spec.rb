describe Album do
  subject { Album.new("name", "artist") }

  it { should respond_to :name }
  it { should respond_to :artist }
  it { should respond_to :tracks }

  let(:tracks) { [Track.new("Track 1", nil, nil), Track.new("Track 2", nil, nil)] }

  describe "#initialize" do
    it "initializes an album with a name, artist, and track list" do
      expect(subject.name).to eq "name"
      expect(subject.artist).to eq "artist"
      expect(subject.tracks).to eq []
    end
  end

  describe "#play_count" do
    it "sums the play counts of all its tracks" do
      allow(tracks[0]).to receive(:play_count).and_return(10)
      allow(tracks[1]).to receive(:play_count).and_return(7)
      allow(subject).to receive(:tracks).and_return(tracks)

      expect(subject.play_count).to eq 17
    end
  end

  describe "#find_track" do
    it "finds and returns a track in this album based on track name" do
      allow(subject).to receive(:tracks).and_return(tracks)
      expect(subject.find_track("Track 2")).to eq tracks.last
    end

    it "raises an EntityNotFound error when it doesn't find a track" do
      allow(subject).to receive(:tracks).and_return(tracks)
      expect{ subject.find_track("Noooope") }.to raise_error Errors::EntityNotFound
    end
  end

  describe "#to_s" do
    it "displays the name and play count" do
      allow(subject).to receive(:play_count).and_return(5)
      expect(subject.to_s).to eq "name (5 plays)"
    end
  end
end
