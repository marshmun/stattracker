var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema = new Schema({

    item: {
        name: String,
        date: { type: Date, default: Date.now },
        quanitiy: Number

    }
});


module.exports = mongoose.model("Item", itemSchema)