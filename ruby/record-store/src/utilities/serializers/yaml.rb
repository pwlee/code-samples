module Utilities
  module Serializers
    class YAML
      def self.load(file_path)
        data_file = File.open(file_path, "rb")
        data = data_file.read.to_str
        data_file.close

        return (data.size > 0) ? ::YAML.load(data) : nil
      end

      def self.save(file_path, object)
        File.open(file_path, 'w') { |file| file.write(::YAML.dump(object)) }
      end
    end
  end
end
