const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    name: {
        type: String
    },
    tel: {
        type: Number
    },
    statut: {
        type: String
    },
    favorite: {
        type: Array
    },
    email: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email, pwd, name, tel, statut, favorite) {

    // validation
    if(!email || !pwd) {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(pwd)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if(exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pwd, salt)

    const user = await this.create({email, pwd: hash, name, tel, statut, favorite})

    return user

}

// statics login method
userSchema.statics.login = async function(email, pwd) {

    // validation
    if(!email || !pwd) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(pwd, user.pwd)

    if(!match) {
        throw Error('Incorrect password')
    }

    return user

}

module.exports = mongoose.model('User', userSchema)