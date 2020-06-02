require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true }, ()=> console.log('connected with DB'))

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'))
    app.get('*', (req,res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
    
}

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))