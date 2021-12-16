const mongoose = require("mongoose")
const { schema } = require("./schema/schema")
const kitten = mongoose.model("schema", schema)
const p1 = new kitten({search: "como frita um ovo", resultprimary: "coloca na panela e liga o fogo", resultsegundary: "xvideo.com"})
p1.save()
mongoose.connect('mongodb+srv://abc:abc@cluster0.z9yyy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

module.exports.modelo = kitten