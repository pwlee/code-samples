# Main application class
# Serves as entry point into the application by receving commands
# and routing them to the appropriate service object/method

class MusicLibrary
  @command_parser = nil
  @identity_map   = nil

  def initialize
    @command_parser = Utilities::Parser::Parser.new
    @identity_map   = Utilities::IdentityMap.new
  end

  # Executes a command by parsing an input string
  # and calling the appropriate service method
  #
  # @param input [string] the command to be executed
  # @return [mixed] the result of the execution
  def execute(input)
    command = @command_parser.parse input

    if command.action == :add_artist
      response = Services::AddArtist.new(@identity_map).add_artist(
        command.attributes[:artist]
      )
    elsif command.action == :add_album
      response = Services::AddAlbum.new(@identity_map).add_album(
        command.attributes[:album],
        command.attributes[:by]
      )
    elsif command.action == :add_track
      response = Services::AddTrack.new(@identity_map).add_track(
        command.attributes[:track],
        command.attributes[:on],
        command.attributes[:by]
      )
    elsif command.action == :list_albums
      response = Services::ListAlbums.new(@identity_map).list_albums_by_artist(
        command.attributes[:by]
      )
    elsif command.action == :list_tracks
      response = Services::ListTracks.new(@identity_map).list_tracks_by_album(
        command.attributes[:on]
      )
    elsif command.action == :listen
      response = Services::Listen.new(@identity_map).listen_to_track(
        command.attributes[:to],
        command.attributes[:on],
        command.attributes[:by]
      )
    elsif command.action == :list_top_tracks
      response = Services::ListTracks.new(@identity_map).list_top_tracks(
        command.attributes[:top].to_i
      )
    elsif command.action == :list_top_artists
      response = Services::ListArtists.new(@identity_map).list_top_artists(
        command.attributes[:top].to_i
      )
    elsif command.action == :quit
      exit
    end

    response
  end
end
