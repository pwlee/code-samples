module Utilities
  module Parser
    class Command
      attr_accessor :action, :attributes

      def initialize(action, attributes = {})
        @action = action
        @attributes = {}
        add_attributes attributes
      end

      def add_attributes(attributes)
        attributes.each do |key, value|
          add_attribute key, value
        end
      end

      def add_attribute(name, value)
        @attributes[name] = value.gsub('"', '').strip
      end
    end
  end
end
