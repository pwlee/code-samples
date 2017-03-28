describe Utilities::IdentityMap do
  let(:identity_map) { identity_map = Utilities::IdentityMap.new }

  describe "#put" do
    it "stores an object in a data set" do
      result = identity_map.put(:strings, :foo, "abc")
      expect(result).to eq "abc"
    end
  end

  describe "#get" do
    it "retrieves an object in a data set" do
      data_set_key, key, object = :arrays, :foo, ["a", "b", "c"]
      identity_map.put(data_set_key, key, object)
      expect(identity_map.get(data_set_key, key)).to eq object
    end
  end

  describe "#all" do
    it "returns an entire data set" do
      data_set_key = :things
      identity_map.put(data_set_key, :key_1, "Value 1")
      identity_map.put(data_set_key, :key_2, "Value 2")

      data_set = identity_map.all(data_set_key)

      expect(data_set).to eq({ key_1: "Value 1", key_2: "Value 2" })
    end
  end

  it "throws an EntityNotFound error when trying to retrieve an entity which doesn't exist" do
    expect { identity_map.get(:foo, :bar) }.to raise_error Errors::EntityNotFound
  end
end
