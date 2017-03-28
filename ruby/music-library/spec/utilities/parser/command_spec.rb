describe Utilities::Parser::Command do
  describe "#initialize" do
    it "initializes itself with an action and a hash of attributes" do
      command = Utilities::Parser::Command.new(:update, { attr_1: "foo", attr_2: " bar "})
      expect(command.action).to eq :update
      expect(command.attributes).to eq({ attr_1: "foo", attr_2: "bar" })
    end
  end

  describe "#add_attributes" do
    it "adds a hash of attributes" do
      command = Utilities::Parser::Command.new(:update, { attr_1: "foo" })
      command.add_attributes({attr_2: " fizz ", attr_3: ' "buzz"  '})
      expect(command.attributes).to eq({ attr_1: "foo", attr_2: "fizz", attr_3: 'buzz' })
    end
  end

  describe "#add_attribute" do
    it "adds an attribute after trimming and removing quotes" do
      command = Utilities::Parser::Command.new(:update, { attr_1: "foo" })
      command.add_attribute(:attr_2, '  "derp" ')
      expect(command.attributes).to eq({ attr_1: "foo", attr_2: "derp" })
    end
  end
end
