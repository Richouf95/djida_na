const mongoose = require('mongoose')

const Schema = mongoose.Schema

const houseSchema = new Schema({
    adresse: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    superficie: {
        type: Number,
        required: true
    },
    nombreChambre: {
        type: Number,
        required: true
    },
    nombreSalon: {
        type: Number,
        required: true
    },
    coursUnique: {
        type: Boolean,
        required: true
    },
    dependance: {
        type: Boolean,
        required: true
    },
    jardin: {
        type: Boolean,
        required: true
    },
    piscine: {
        type: Boolean,
        required: true
    },
    imagePrincipale: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    imageSecondaire: {
        type: Array
    },
    disponible: {
        type: Boolean
    },
    favorite: {
        type: Array
    },
    payment: {
        type: Array
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('House', houseSchema)