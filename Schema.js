const mongoose  = require('mongoose');

module.exports = mongoose.model("DataSchema", new mongoose.Schema({
    id: Number,
    LedNumber:{
        type: Number,
        required: true
    },
    data: String
}))