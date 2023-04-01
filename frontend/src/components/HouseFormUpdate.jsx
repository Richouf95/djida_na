import React from 'react'
import { useState } from 'react'
import { useHousesContext } from '../hooks/useHousesContext'

function HouseForm({house}) {

    const {dispatch} = useHousesContext()

    const [images, setImages] = useState(house.imageSecondaire)

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

        const houseUP = {
            imageSecondaire : images
        }

        const response = await fetch('/api/house/' + house._id, {
            method: 'PATCH',
            body: JSON.stringify(houseUP),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            setImages([])
            setError(null)
            console.log('New house added : ', json);
            let checkbox = Array.from(document.querySelectorAll('.form-check-input'))
            checkbox.map(i => {
                return i.checked = false
            })
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
        <div className="mb-3">
            <label className="form-label">Image Secondaire 2</label>
            <input onChange={handleImage} type="file" className={`form-control`} />
        </div>
        <div className="mb-3">
            <label className="form-label">Image Secondaire 3</label>
            <input onChange={handleImage} type="file" className={`form-control`} />
        </div>
        <div className="mb-3">
            <label className="form-label">Image Secondaire 4</label>
            <input onChange={handleImage} type="file" className={`form-control`} />
        </div>
        <div className="mb-3">
            <label className="form-label">Image Secondaire 5</label>
            <input onChange={handleImage} type="file" className={`form-control`} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Valider</button>
        {
            error && <div>{error}</div>
        }
    </form>
  )
}

export default HouseForm