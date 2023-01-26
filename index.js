const express = require("express")
const cors = require("cors")
const compression = require("compression")
const mongoCrud = require("./crud.js")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(compression())

app.post("/create", mongoCrud.create)
app.post("/createMany", mongoCrud.createMany)
app.get("/findAll", mongoCrud.findAll)
app.get("/findOne", mongoCrud.findOne)
app.patch("/update", mongoCrud.update)
app.put("/upsert", mongoCrud.upsert)
app.put("/replaceOne", mongoCrud.replaceOne)
app.delete("/delete", mongoCrud.deleteOne)

app.listen(port, () => console.log(`Server running on port ${port}`))
