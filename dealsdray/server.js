import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import routers from './routes.js'
import dbCon from "./db.js";



dotenv.config()
const app=express()
dbCon()
app.use(cors())
app.use(express.json())
app.use('/api',routers)




app.listen(process.env.PORT,()=>{
    console.log('server is running')
})