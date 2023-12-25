const express = require('express')
const app = express()
const urlRouter = require('./server/routes/urlRouter')
require('dotenv').config()
require('./server/db/conn')

const PORT = 1818

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.use('/', urlRouter)

app.set('layout', './layout/main')
app.set('view engine', 'ejs')


app.listen(PORT, ()=>{
    console.log(`Server started at http://localhost:${PORT}`);
})