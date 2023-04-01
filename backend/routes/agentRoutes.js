const express = require('express')
const Agent = require('../models/agentModel')
const {
    getAllAgents,
    getAgent,
    createAgent,
    deleteAgent,
    updateAgent
} = require('../controllers/agentController')

const router = express.Router()

// GET all Agents
router.get('/', getAllAgents)

// GET a single Agent
router.get('/:id', getAgent)

// CREATE a new Agent
router.post('/', createAgent)

// DELETE a Agent 
router.delete('/:id', deleteAgent)

// UPDATA a Agent
router.patch('/:id', updateAgent)

module.exports = router