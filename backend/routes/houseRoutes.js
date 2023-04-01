const express = require('express')
const {
    getAllHouses,
    getHouse,
    createHouse,
    deleteHouse,
    updateHouse
} = require('../controllers/houseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all house routes
router.use(requireAuth)

// GET all Houses
router.get('/', getAllHouses)

// GET a single House
router.get('/:id', getHouse)

// CREATE a new House
router.post('/', createHouse)

// DELETE a House 
router.delete('/:id', deleteHouse)

// UPDATA a House
router.patch('/:id', updateHouse)

module.exports = router