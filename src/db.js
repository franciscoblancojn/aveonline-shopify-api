const env = require("@app/env")
const { MongoClient, ObjectId } = require('mongodb')

/**
  * Get
  * @description funcion de DB para optener datos por medio de query
  * @param {query,table}
  * @returns {respond}
  */
const get = async ({ query = {}, table, options = {}, preToArray = (e) => e }) => {
  if (query._id) {
    query._id = new ObjectId(query._id)
  }
  const client = new MongoClient(env.DATABASE_MONGO_URL)
  try {
    if (!client) {
      throw new Error('error conection database Mongo')
    }
    await client.connect()
    const dbMongo = client.db(env.DATABASE_MONGO)
    const collection = dbMongo.collection(table)
    const response = await preToArray(collection.find(query, options)).toArray()
    const result = await response
    return result
  } catch (error) {
    return {
      type: 'error',
      error: `${error}`
    }
  } finally {
    await client.close()
  }
}
/**
    * Post
    * @description funcion de DB para crear datos por medio de data
    * @param {data,table}
    * @returns {respond}
    */
const post = async ({ data, table, options = {} }) => {
  const client = new MongoClient(env.DATABASE_MONGO_URL)
  try {
    if (!client) {
      throw new Error('error conection database Mongo')
    }
    await client.connect()
    const dbMongo = client.db(env.DATABASE_MONGO)
    const collection = dbMongo.collection(table)
    const response = await collection.insert(data, options)
    const result = await response
    return result
  } catch (error) {
    return {
      type: 'error',
      error: `${error}`
    }
  } finally {
    await client.close()
  }
}
/**
    * Put
    * @description funcion de DB para actualizar datos por medio de data y where
    * @param {data,where,table}
    * @returns {respond}
    */
const put = async ({ data, where, table, options = {} }) => {
  if (where._id) {
    where._id = new ObjectId(where._id)
  }
  const client = new MongoClient(env.DATABASE_MONGO_URL)
  try {
    if (!client) {
      throw new Error('error conection database Mongo')
    }
    await client.connect()
    const dbMongo = client.db(env.DATABASE_MONGO)
    const collection = dbMongo.collection(table)
    const response = await collection.update(where, data, options)
    const result = await response
    return result
  } catch (error) {
    return {
      type: 'error',
      error: `${error}`
    }
  } finally {
    await client.close()
  }
}
/**
    * Delete_
    * @description funcion de DB para elimara datos por medio de where
    * @param {where,table}
    * @returns {respond}
    */
const delete_ = async ({ where, table, options = {} }) => {
  if (where._id) {
    where._id = new ObjectId(where._id)
  }
  const client = new MongoClient(env.DATABASE_MONGO_URL)
  try {
    if (!client) {
      throw new Error('error conection database Mongo')
    }
    await client.connect()
    const dbMongo = client.db(env.DATABASE_MONGO)
    const collection = dbMongo.collection(table)
    const response = await collection.remove(where, options)
    const result = await response
    return result
  } catch (error) {
    return {
      type: 'error',
      error: `${error}`
    }
  } finally {
    await client.close()
  }
}
/**
* drop
* @description funcion de DB para borrar coleccines
* @param {query,table}
* @returns {respond}
*/
const drop = async ({ table }) => {
  const client = new MongoClient(env.DATABASE_MONGO_URL)
  try {
    if (!client) {
      throw new Error('error conection database Mongo')
    }
    await client.connect()
    const dbMongo = client.db(env.DATABASE_MONGO)
    const collection = dbMongo.collection(table)
    const response = await collection.drop()
    const result = await response
    return result
  } catch (error) {
    return {
      type: 'error',
      error: `${error}`
    }
  } finally {
    await client.close()
  }
}
/**
  * count
  * @description funcion de DB para optener la cantidad de elementos
  * @param {query,table}
  * @returns {respond}
  */
const count = async ({ query = {}, table, options = {} }) => {
  if (query._id) {
    query._id = new ObjectId(query._id)
  }
  const client = new MongoClient(env.DATABASE_MONGO_URL)
  try {
    if (!client) {
      throw new Error('error conection database Mongo')
    }
    await client.connect()
    const dbMongo = client.db(env.DATABASE_MONGO)
    const collection = dbMongo.collection(table)
    const response = await collection.countDocuments(query, options)
    const result = await response
    return result
  } catch (error) {
    return {
      type: 'error',
      error: `${error}`
    }
  } finally {
    await client.close()
  }
}

/**
  * distinct
  * @description funcion de DB para obetener items no duplicados
  * @param {query,table}
  * @returns {respond}
  */
const distinct = async ({ field = '_id', query = {}, table, options = {} }) => {
  if (query._id) {
    query._id = new ObjectId(query._id)
  }
  const client = new MongoClient(env.DATABASE_MONGO_URL)
  try {
    if (!client) {
      throw new Error('error conection database Mongo')
    }
    await client.connect()
    const dbMongo = client.db(env.DATABASE_MONGO)
    const collection = dbMongo.collection(table)
    const response = await collection.distinct(field, query, options)
    const result = await response
    return result
  } catch (error) {
    return {
      type: 'error',
      error: `${error}`
    }
  } finally {
    await client.close()
  }
}
/**
* db
* @description objeto usado por enpoints en el forlder enpoints para hacer crud en base de datos
*/
const db = {
  get,
  post,
  put,
  delete: delete_,
  drop,
  count,
  distinct
}

module.exports = db
