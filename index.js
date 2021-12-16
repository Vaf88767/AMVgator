const express = require("express")
const { modelo } = require("./database")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.post("/fetchforAMVGATOR", (req,res) => {
    const {pesquisa} = req.body
    console.log(pesquisa)
    modelo.find({"search": `${pesquisa}`}, (err,person) => {
        if(err) console.log(err)
        
            res.send(person)
        
    })
    
})

app.listen(8080)