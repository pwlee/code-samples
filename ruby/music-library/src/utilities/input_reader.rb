module Utilities
  class InputReader
    @input_source = nil
    @input_mode = nil

    def initialize(file_path = nil)
      @input_source = STDIN
      @input_mode = :stdin

      if file_path
        begin
          @input_source = File.open(file_path)
          @input_mode = :file
        rescue
          puts "Whoops.  Can't open that file."
          switch_to_stdin
        end
      end
    end

    def get_line
      print "Command > "

      if input = @input_source.gets
        print "#{input}" unless @input_mode == :stdin
        sleep 0.25       unless @input_mode == :stdin
      else
        print "(End of File) "
        @input_source.close
        switch_to_stdin
        puts ""
      end

      input
    end

    private

    def switch_to_stdin
      puts "Switching to STDIN"
      @input_source = STDIN
      @input_mode = :stdin
    end
  end
end
