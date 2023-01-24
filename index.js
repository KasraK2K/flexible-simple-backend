const express = require("express")
const cors = require("cors")
const compression = require("compression")
const {
  create,
  findAll,
  findOne,
  update,
  upsert,
  replaceOne,
  deleteOne,
} = require("./crud.js")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(compression())

app.post("/create", create)
app.get("/findAll", findAll)
app.get("/findOne", findOne)
app.patch("/update", update)
app.put("/upsert", upsert)
app.put("/replaceOne", replaceOne)
app.delete("/delete", deleteOne)

app.listen(port, () => console.log(`Server running on port ${port}`))
