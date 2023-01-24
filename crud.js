const { MongoClient, ObjectId } = require("mongodb")
const mongoClient = new MongoClient("mongodb://0.0.0.0:27017")
mongoClient
  .on("connect", () => console.log("MongoDB connected"))
  .on("close", () => console.log("MongoDB connection closed"))
  .on("error", (err) => {
    console.log("MongoDB Error")
    console.error(err)
    process.exit(1)
  })

async function create(req, res) {
  try {
    const { database, collection, doc } = req.body
    const result = await mongoClient
      .db(database)
      .collection(collection)
      .insertOne(doc)
    return res.json({ result })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function createMany(req, res) {
  try {
    const { database, collection, docs } = req.body
    const result = await mongoClient
      .db(database)
      .collection(collection)
      .insertMany(docs)
    return res.json({ result })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function findAll(req, res) {
  try {
    const { database, collection, selector } = req.body
    if ("_id" in selector) selector._id = new ObjectId(selector._id)
    const result = await mongoClient
      .db(database)
      .collection(collection)
      .find(selector)
      .toArray()
    return res.json({ count: result.length, result })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function findOne(req, res) {
  try {
    const { database, collection, selector } = req.body
    if ("_id" in selector) selector._id = new ObjectId(selector._id)
    const result = await mongoClient
      .db(database)
      .collection(collection)
      .findOne(selector)
    return res.json({ result })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function update(req, res) {
  const { database, collection, selector, doc } = req.body
  if ("_id" in selector) selector._id = new ObjectId(selector._id)
  const result = await mongoClient
    .db(database)
    .collection(collection)
    .updateOne(selector, { $set: doc }, { upsert: false })
  return res.json({ result })
}

async function upsert(req, res) {
  const { database, collection, selector, doc } = req.body
  if ("_id" in selector) selector._id = new ObjectId(selector._id)
  const result = await mongoClient
    .db(database)
    .collection(collection)
    .updateOne(selector, { $set: doc }, { upsert: true })
  return res.json({ result })
}

async function replaceOne(req, res) {
  const { database, collection, selector, doc } = req.body
  if ("_id" in selector) selector._id = new ObjectId(selector._id)
  const result = await mongoClient
    .db(database)
    .collection(collection)
    .replaceOne(selector, doc)
  return res.json({ result })
}

async function deleteOne(req, res) {
  const { database, collection, selector } = req.body
  if ("_id" in selector) selector._id = new ObjectId(selector._id)
  const result = await mongoClient
    .db(database)
    .collection(collection)
    .deleteOne(selector)
  return res.json({ result })
}

module.exports = {
  create,
  createMany,
  findAll,
  findOne,
  update,
  upsert,
  replaceOne,
  deleteOne,
}
