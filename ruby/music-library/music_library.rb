# Main file and application bootstrap

# Load up all of our classes in ./src
Dir["./src/**/*.rb"].each { |file| require file }

puts "-------------"
puts "Music Library"
puts "-------------"

input_file    = (ARGV.first) ? ARGV.first : nil
input_reader  = Utilities::InputReader.new(input_file)
music_library = MusicLibrary.new

while true do
  begin
    if input = input_reader.get_line
      puts music_library.execute(input)
      puts ""
    end

  rescue Errors::EntityNotFound, Errors::UnrecognizedCommand => e
    puts e.message
    puts ""
  end
end
