module Utilities
  module Parser
    class Parser
      def parse(input)
        if (match = /add artist (.*)/.match input)
          Command.new(:add_artist, { artist: match[1] })

        elsif (match = /add album (.*) by (.*)/.match input)
          Command.new(:add_album, { album: match[1], by: match[2] })

        elsif (match = /add track (.*) on (.*) by (.*)/.match input)
          Command.new(:add_track, { track: match[1], on: match[2], by: match[3] })

        elsif (match = /list albums by (.*)/.match input)
          Command.new(:list_albums, { type: "albums", by: match[1] })

        elsif (match = /list tracks on (.*) by (.*)/.match input)
          Command.new(:list_tracks, { type: "tracks", on: match[1], by: match[2] })

        elsif (match = /listen to (.*) on (.*) by (.*)/.match input)
          Command.new(:listen, { to: match[1], on: match[2], by: match[3] })

        elsif (match = /list top (\d*) tracks/.match input)
          Command.new(:list_top_tracks, { type: "tracks", top: match[1] })

        elsif (match = /list top (\d*) artists/.match input)
          Command.new(:list_top_artists, { type: "artists", top: match[1] })

        elsif (match = /quit/.match input)
          Command.new(:quit, {})

        else
          raise Errors::UnrecognizedCommand
        end
      end
    end
  end
end
