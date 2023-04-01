const mongoose = require('mongoose')
const { schema } = require('./agentModel')

const Schema = mongoose.Schema

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tel: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    statut: {
        type: String,
        required: true
    },
    favorite: {
        type: Array
    }
}, {timestamps: true})

module.exports = mongoose.model('Client', clientSchema)