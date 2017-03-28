describe Utilities::Parser do
  let(:parser) { Utilities::Parser::Parser.new }
  describe "#parse" do
    it "parses an 'add artist' command" do
      command = parser.parse('add artist "foo"')
      expect(command.action).to eq :add_artist
      expect(command.attributes).to eq({artist: 'foo'})
    end

    it "parses an 'add album' command" do
      command = parser.parse('add album "bar by bar" by bob')
      expect(command.action).to eq :add_album
      expect(command.attributes).to eq({album: 'bar by bar', by: 'bob'})
    end

    it "parses an 'add track' command" do
      command = parser.parse('add track "dancing man" on foo by bob')
      expect(command.action).to eq :add_track
      expect(command.attributes).to eq({track: 'dancing man', on: 'foo', by: 'bob'})
    end

    it "parses a 'list albums' command" do
      command = parser.parse('list albums by bob')
      expect(command.action).to eq :list_albums
      expect(command.attributes).to eq({type: 'albums', by: 'bob'})
    end

    it "parses a 'list tracks' command" do
      command = parser.parse('list tracks on "bar by bar" by bob')
      expect(command.action).to eq :list_tracks
      expect(command.attributes).to eq({type: 'tracks', on: 'bar by bar', by: 'bob'})
    end

    it "parses a 'listen to' command" do
      command = parser.parse('listen to "Foob" on "Barrr" by "Foofoo Barrrr"')
      expect(command.action).to eq :listen
      expect(command.attributes).to eq({to:'Foob', on:'Barrr', by:'Foofoo Barrrr'})
    end

    it "parses a 'list top tracks' command" do
      command = parser.parse('list top 4 tracks')
      expect(command.action).to eq :list_top_tracks
      expect(command.attributes).to eq({type: 'tracks', top: '4'})
    end

    it "parses a 'list top artists' command" do
      command = parser.parse('list top 2 artists')
      expect(command.action).to eq :list_top_artists
      expect(command.attributes).to eq({type: 'artists', top: '2'})
    end

    it "parses a 'quit' command" do
      command = parser.parse('quit')
      expect(command.action).to eq :quit
    end

    it "raises an error if it encounters an unknown command" do
      expect { parser.parse('herp derp') }.to raise_error Errors::UnrecognizedCommand
    end
  end
end
