const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
    name: { type: String, default: null },
    type: { type: String, default: null },
    moveSet: { type: [String], default: null },
    image: { type: String, unique: true}
});

module.exports = mongoose.model("animal", animalSchema);