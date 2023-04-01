require('dotenv').config()
const express = require('express')
const agentRoutes = require('./routes/agentRoutes')
const clientRoutes = require('./routes/clientRoutes')
const houseRoutes = require('./routes/houseRoutes')
const propositionROutes = require('./routes/propositionRoutes')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
// const cors = require('cors')

// express app
const app = express()

// middleware
app.use(express.json({
    limit:'50mb'
}))

// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ["GET", "POST", "PATCH", "DELETE"]
// }))

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/agent', agentRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/house', houseRoutes)
app.use('/api/proposition', propositionROutes)
app.use('/api/user', userRoutes)

// connect to DB
mongoose.connect(process.env.MONGODB_URI)
    .then (() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connect to db & Listen on port : ' + process.env.PORT)
        })
    })
    .catch(err => {
        console.log(err)
    }) 

