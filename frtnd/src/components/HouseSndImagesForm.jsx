import React from 'react'
import { useState } from 'react'
import { useHousesContext } from '../hooks/useHousesContext'
import { useAuthContext } from '../hooks/useAuthContext'

function HouseSndImagesForm({houseToUpdate}) {

    const {dispatch} = useHousesContext()
    const { user } = useAuthContext()

    const [images, setImages] = useState(houseToUpdate.imageSecondaire)

    const [error, setError] = useState(null)

    // handle an convert image
    const handleImage = (e) => {
        const file = e.target.files[0]
        setFileToBase(file)
    }

    const setFileToBase = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            const newArray = [...images, reader.result]
            setImages(newArray)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return
        }

        const houseUP = {
            imageSecondaire : images
        }

        const response = await fetch('/api/house/' + houseToUpdate._id, {
            method: 'PATCH',
            body: JSON.stringify(houseUP),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.userToken}`
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            setImages([])
            setError(null)
            console.log('Images added : ', json.imageSecondaire)
            dispatch({
                type: 'UPDATE_HOUSE',
                payload: json
            })
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label">Image Secondaire 1</label>
            <input onChange={handleImage} type="file" className={`form-control`} />
        </div>
        <button type="submit" className="btn btn-dark w-100">Valider</button>
        {
            error && <div>{error}</div>
        }
    </form>
  )
}

export default HouseSndImagesForm