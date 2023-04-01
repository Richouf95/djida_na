const mongoose = require('mongoose')

const Schema = mongoose.Schema

const propositionSchema = new Schema({
    token: {
        type: Object
    },
    house: {
        type: Object
    },
    user_id: {
        type: String,
        required: true
    }
    // agentID:{
    //     type: String,
    //     required: true
    // },
    // houseId:{
    //     type: String,
    //     required: true
    // },
    // listProposition: {
    //     type: Array
    // },
    // gagnantId: {
    //     type: String
    // },
    // estPrise: {
    //     type: Boolean,
    //     required: true
    // }
}, {timestamps: true})

module.exports = mongoose.model('Proposition', propositionSchema)