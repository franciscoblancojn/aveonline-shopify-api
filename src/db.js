/**
 * load prisma npm
 */
 const { PrismaClient } = require('@prisma/client')

 /**
   * Get
   * @description funcion de DB para optener datos por medio de where en tablas espesificas
   * @param {where,table}
   * @returns {respond}
   */
 const get = async ({ where, table }) => {
   try {
     const prisma = new PrismaClient()
     const respond = await prisma[table].findMany({where})
     await prisma.$disconnect()
     return respond
   } catch (error) {
     return {
         type: 'error',
         error: `${error}`
     }
   }
 }
 /**
   * Post
   * @description funcion de DB para crear datos por medio de data en tablas espesificas
   * @param {data,table}
   * @returns {respond}
   */
 const post = async ({ data, table }) => {
   try {
     const prisma = new PrismaClient()
     const respond = await prisma[table].create({ data })
     await prisma.$disconnect()
     return respond
   } catch (error) {
     return {
         type: 'error',
         error: `${error}`
     }
   }
 }
 /**
   * Put
   * @description funcion de DB para actualizar datos por medio de data y where en tablas espesificas
   * @param {data,where,table}
   * @returns {respond}
   */
 const put = async ({ data, where, table }) => {
   try {
     const prisma = new PrismaClient()
     const respond = await prisma[table].update({ where, data })
     await prisma.$disconnect()
     return respond
   } catch (error) {
     return {
         type: 'error',
         error: `${error}`
     }
   }
 }
 /**
   * Delete_
   * @description funcion de DB para elimara datos por medio de where en tablas espesificas
   * @param {where,table}
   * @returns {respond}
   */
 const delete_ = async ({ where, table }) => {
   try{
     const prisma = new PrismaClient()
     const respond = await prisma[table].delete({ where })
     await prisma.$disconnect()
     return respond
   } catch (error) {
     return {
         type: 'error',
         error: `${error}`
     }
   }
 }
 /**
   * upsert
   * @description funcion de DB para crear y actualizar a la vez
   * @param {where,table}
   * @returns {respond}
   */
 const upsert = async ({ create, update, where, table }) => {
   try{
     const prisma = new PrismaClient()
     const respond = await prisma[table].upsert({ create, update, where })
     await prisma.$disconnect()
     return respond
   } catch (error) {
     return {
         type: 'error',
         error: `${error}`
     }
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
   upsert
 }
 
 module.exports = db
 