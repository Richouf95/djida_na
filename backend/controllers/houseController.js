const House = require('../models/houseModel')
const mongoose = require('mongoose')
const cloudInary = require('../utils/cloudInary')



// GET all Houses
const getAllHouses = async (req,res) => {
    const houses = await House.find({ }).sort({createdAt: -1})

    res.status(200).json(houses)
}

// GET a single House
const getHouse = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such House'})
    }

    const house = await House.findById(id)

    if(!house) {
        return res.status(400).json({error: 'No such House'})
    }

    res.status(200).json(house)
}

// CREATE a new House
const createHouse = async (req,res) => {
    const {
        adresse,
        prix,
        superficie,
        nombreChambre,
        nombreSalon,
        coursUnique,
        dependance,
        jardin,
        piscine,
        imagePrincipale,
        imageSecondaire,
        disponible,
        favorite,
        payment
    } = req.body

    let emptyFields = []

    if(!adresse) {emptyFields.push('adresse')}
    if(!prix) {emptyFields.push('prix')}
    if(!superficie) {emptyFields.push('superficie')}
    if(!nombreChambre) {emptyFields.push('nombreChambre')}
    if(!nombreSalon) {emptyFields.push('nombreSalon')}
    if(!imagePrincipale) {emptyFields.push('imagePrincipale')}

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }


    try {
        const result = await cloudInary.uploader.upload(imagePrincipale, {
            folder: "djidana_Images_Pricipale", 
            use_filename: true,
            unique_filename: false
        })

        const user_id = req.user._id

        const house = await House.create({adresse, prix, superficie, nombreChambre, nombreSalon, coursUnique, dependance, jardin, piscine, imagePrincipale: {public_id: result.public_id, url: result.secure_url}, imageSecondaire, disponible, favorite, payment, user_id})
        res.status(200).json(house)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

// DELETE a House 
const deleteHouse = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such House'})
    }

    const house = await House.findByIdAndDelete({_id: id})

    if(!house) {
        return res.status(400).json({error: 'No such House'})
    }

    res.status(200).json(house)
}

// UPDATA a House
const updateHouse = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such House'})
    }

    const house = await House.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!house) {
        return res.status(400).json({error: 'No such House'})
    }

    res.status(200).json(house)
}

module.exports = {
    getAllHouses,
    getHouse,
    createHouse,
    deleteHouse,
    updateHouse
}