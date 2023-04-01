const express = require('express')
const {
    getAllCLients,
    getCLient,
    createCLients,
    deleteCLients,
    updateCLients
} = require('../controllers/clientController')

const router = express.Router()


// GET all Agents
router.get('/', getAllCLients)

// GET a single Agent
router.get('/:id', getCLient)

// CREATE a new Agent
router.post('/', createCLients)

// DELETE a Agent 
router.delete('/:id', deleteCLients)

// UPDATA a Agent
router.patch('/:id', updateCLients)

module.exports = router