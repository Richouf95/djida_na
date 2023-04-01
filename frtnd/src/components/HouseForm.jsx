import React from 'react'
import { useState } from 'react'
import { useHousesContext } from '../hooks/useHousesContext'
import { useAuthContext } from '../hooks/useAuthContext'

function HouseForm() {

    const {dispatch} = useHousesContext()
    const { user } = useAuthContext()

    const [adresse, setAdresse] = useState('')
    const [superficie, setSuperficie] = useState('')
    const [nombreChambre, setNombreChambre] = useState('')
    const [nombreSalon, setNombreSalon] = useState('')
    const [coursUnique, setCoursUnique] = useState(false)
    const [dependance, setDependance] = useState(false)
    const [jardin, setJardin] = useState(false)
    const [piscine, setPiscine] = useState(false)
    const [prix, setPrix] = useState('')
    const [disponible, setDisponible] = useState(true)
    const [imagePrincipale, setImagePrincipale] = useState(null)

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    // handle an convert image
    const handleImage = (e) => {
        const file = e.target.files[0]
        setFileToBase(file)
    }

    const setFileToBase = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImagePrincipale(reader.result)

        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return
        }

        const house = {adresse, 
            superficie, 
            nombreChambre, 
            nombreSalon, 
            coursUnique, 
            dependance, 
            jardin, 
            piscine, 
            prix,
            disponible,
            imagePrincipale
        }

        const response = await fetch('/api/house', {
            method: 'POST',
            body: JSON.stringify(house),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.userToken}`
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setAdresse('')
            setSuperficie('')
            setNombreChambre('')
            setNombreSalon('')
            setCoursUnique(false)
            setDependance(false)
            setJardin(false)
            setPiscine(false)
            setPrix('')
            setDisponible(true)
            setImagePrincipale('')
            setError(null)
            setEmptyFields([])
            console.log('New house added : ', json);
            let checkbox = Array.from(document.querySelectorAll('.form-check-input'))
            checkbox.map(i => {
                return i.checked = false
            })
            dispatch({
                type: 'CREATE_HOUSE',
                payload: json
            })
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label">Address</label>
            <input value={adresse} onChange={(e) => setAdresse(e.target.value)} type="text" className={`form-control ${emptyFields && emptyFields.includes('adresse') ? 'error' : ''}`} />
        </div>
        <div className="mb-3">
            <label className="form-label">Superficie</label>
            <input value={superficie} onChange={(e) => setSuperficie(e.target.value)} type="number" className={`form-control ${emptyFields && emptyFields.includes('superficie') ? 'error' : ''}`} />
        </div>
        <div className="mb-3">
            <label className="form-label">Nombre de chambre</label>
            <input value={nombreChambre} onChange={(e) => setNombreChambre(e.target.value)} type="number" className={`form-control ${emptyFields && emptyFields.includes('nombreChambre') ? 'error' : ''}`} />
        </div>
        <div className="mb-3">
            <label className="form-label">Nombre de salon</label>
            <input value={nombreSalon} onChange={(e) => setNombreSalon(e.target.value)} type="number" className={`form-control ${emptyFields && emptyFields.includes('nombreSalon') ? 'error' : ''}`} />
        </div>

        <div className="mb-3 form-check">
            <input value={coursUnique} onClick={() => {
                if(coursUnique === false) {
                    setCoursUnique(true)
                } else if(coursUnique === true) {
                    setCoursUnique(false)
                }
            }} type="checkbox" className={`form-check-input`}/>
            <label className="form-check-label">Cours unique ?</label>
        </div>
        <div className="mb-3 form-check">
            <input value={dependance} onClick={() => {
                if(dependance === false) {
                    setDependance(true)
                } else if(dependance === true) {
                    setDependance(false)
                }
            }} type="checkbox" className={`form-check-input`}/>
            <label className="form-check-label">Dépendance ?</label>
        </div>
        <div className="mb-3 form-check">
            <input value={jardin} onClick={() => {
                if(jardin === false) {
                    setJardin(true)
                } else if(jardin === true) {
                    setJardin(false)
                }
            }} type="checkbox" className={`form-check-input`}/>
            <label className="form-check-label">Jardin ?</label>
        </div>
        <div className="mb-3 form-check">
            <input value={piscine} onClick={() => {
                if(piscine === false) {
                    setPiscine(true)
                } else if(piscine === true) {
                    setPiscine(false)
                }
            }} type="checkbox" className={`form-check-input`}/>
            <label className="form-check-label">Piscine ?</label>
        </div>

        <div className="mb-3">
            <label className="form-label">Prix</label>
            <input value={prix} onChange={(e) => setPrix(e.target.value)} type="number" className={`form-control ${emptyFields && emptyFields.includes('prix') ? 'error' : ''}`} />
        </div>
        <div className="mb-3">
            <label className="form-label">Image Principale</label>
            <input onChange={handleImage} type="file" className={`form-control ${emptyFields && emptyFields.includes('imagePrincipale') ? 'error' : ''}`} />
        </div>
        <button type="submit" className="btn btn-dark w-100">Valider</button>
        {
            error && <div>{error}</div>
        }
    </form>
  )
}

export default HouseForm