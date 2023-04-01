const Client = require('../models/clientModel')
const mongoose = require('mongoose')


// GET all Clients
const getAllCLients = async (req,res) => {
    const clients = await Client.find({ }).sort({createdAt: -1})

    res.status(200).json(clients)
}

// GET a single Client
const getCLient = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Client'})
    }

    const client = await Client.findById(id)

    if(!client) {
        return res.status(404).json({error: 'No such Client'})
    }

    res.status(200).json(client)
}

// CREATE a new Client
const createCLients = async (req,res) => {
    const {name, tel, email, pwd, statut, favorite} = req.body

    try {
        const client = await Client.create({name, tel, email, pwd, statut, favorite})
        res.status(200).json(client)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

// DELETE a Client 
const deleteCLients = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Client'})
    }

    const client = await Client.findByIdAndDelete({_id: id})

    if(!client) {
        return res.status(404).json({error: 'No such Client'})
    }

    res.status(200).json(client)
}

// UPDATA a Client
const updateCLients = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Client'})
    }

    const client = await Client.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!client) {
        return res.status(404).json({error: 'No such Client'})
    }

    res.status(200).json(client)
}

module.exports = {
    getAllCLients,
    getCLient,
    createCLients,
    deleteCLients,
    updateCLients
}