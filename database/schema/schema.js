const mongoose = require("mongoose")

module.exports.schema = new mongoose.Schema({
        search: String,
        resultprimary: String,
        resultsegundary: String
    })
