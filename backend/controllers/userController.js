const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login
const loginUser = async (req,res) => {
    const {email, pwd} = req.body

    try {
        const user = await User.login(email, pwd)

        // create a token
        const userToken = createToken(user._id)

        res.status(200).json({email, userToken, user})
    } catch (err) {
        res.status(400).json({error: err.message})
    }

}

// signup
const signupUser = async (req,res) => {

    const {email, pwd, name, tel, statut, favorite} = req.body

    try {
        const user = await User.signup(email, pwd, name, tel, statut, favorite)

        // create a token
        const userToken = createToken(user._id)

        res.status(200).json({email, userToken})
    } catch (err) {
        res.status(400).json({error: err.message})
    }

}

// update user
const updateUser = async (req,res) => {
    const {id} = req.params

    console.log(id);

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such User'})
    }

    const user = await User.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!user) {
        return res.status(404).json({error: 'No such User'})
    }

    res.status(200).json(user)
}

module.exports = {
    loginUser,
    signupUser,
    updateUser
}