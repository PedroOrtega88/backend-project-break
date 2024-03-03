require('dotenv').config();

const express = require ('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
const { dbConnection } = require('./config/db.js');
const productRoutes = require('.routes/ProductRoutes');

app.use(express.json())

app.use('/', productRoutes);



dbConnection();






app.listen(PORT, ()=>{
    console.log (`Express esta escuchando en el puerto http://localhost:${PORT}`)


})