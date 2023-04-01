const Agent = require('../models/agentModel')
const mongoose = require('mongoose')

// GET all Agents
const getAllAgents = async (req,res) => {
    const agents = await Agent.find({ }).sort({createdAt: -1})

    res.status(200).json(agents)
}

// GET a single Agent
const getAgent = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Agent'})
    }

    const agent = await Agent.findById(id)

    if(!agent) {
        return res.status(404).json({error: 'No such Agent'})
    }

    res.status(200).json(agent)
}

// CREATE a new Agent
const createAgent = async (req,res) => {
    const {name, tel, email, pwd} = req.body

    // add agent
    try {
        const agent = await Agent.create({name, tel, email, pwd})
        res.status(200).json(agent)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

// DELETE a Agent 
const deleteAgent = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Agent'})
    }

    const agent = await Agent.findByIdAndDelete({_id: id})

    if(!agent) {
        return res.status(404).json({error: 'No such Agent'})
    }

    res.status(200).json(agent)
}

// UPDATA a Agent
const updateAgent = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Agent'})
    }

    const agent = await Agent.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!agent) {
        return res.status(404).json({error: 'No such Agent'})
    }

    res.status(200).json(agent)
}

module.exports = {
    getAllAgents,
    getAgent,
    createAgent,
    deleteAgent,
    updateAgent
}