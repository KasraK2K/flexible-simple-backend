const { MongoClient, ObjectId } = require("mongodb")
const { request, response } = require("express")
const mongoClient = new MongoClient("mongodb://0.0.0.0:27017")
mongoClient
  .on("connect", () => console.log("MongoDB connected"))
  .on("close", () => console.log("MongoDB connection closed"))
  .on("error", (err) => {
    console.log("MongoDB Error")
    console.error(err)
    process.exit(1)
  })

class MongoCrud {
  /**
   * @param {request} req
   * @param {response} res
   */
  async findAll(req, res) {
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

  /**
   * @param {request} req
   * @param {response} res
   */
  async findOne(req, res) {
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

  /**
   * @param {request} req
   * @param {response} res
   */
  async create(req, res) {
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

  /**
   * @param {request} req
   * @param {response} res
   */
  async createMany(req, res) {
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

  /**
   * @param {request} req
   * @param {response} res
   */
  async update(req, res) {
    try {
      const { database, collection, selector, doc } = req.body
      if ("_id" in selector) selector._id = new ObjectId(selector._id)
      const result = await mongoClient
        .db(database)
        .collection(collection)
        .updateOne(selector, { $set: doc }, { upsert: false })
      return res.json({ result })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  /**
   * @param {request} req
   * @param {response} res
   */
  async upsert(req, res) {
    try {
      const { database, collection, selector, doc } = req.body
      if ("_id" in selector) selector._id = new ObjectId(selector._id)
      const result = await mongoClient
        .db(database)
        .collection(collection)
        .updateOne(selector, { $set: doc }, { upsert: true })
      return res.json({ result })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  /**
   * @param {request} req
   * @param {response} res
   */
  async replaceOne(req, res) {
    try {
      const { database, collection, selector, doc } = req.body
      if ("_id" in selector) selector._id = new ObjectId(selector._id)
      const result = await mongoClient
        .db(database)
        .collection(collection)
        .replaceOne(selector, doc)
      return res.json({ result })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  /**
   * @param {request} req
   * @param {response} res
   */
  async deleteOne(req, res) {
    try {
      const { database, collection, selector } = req.body
      if ("_id" in selector) selector._id = new ObjectId(selector._id)
      const result = await mongoClient
        .db(database)
        .collection(collection)
        .deleteOne(selector)
      return res.json({ result })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

module.exports = new MongoCrud()
