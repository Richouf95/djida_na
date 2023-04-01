import React from 'react'
import { useHousesContext } from '../hooks/useHousesContext'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
// import { useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

function DashBoard() {

    

    const {houses} = useHousesContext()
    const { user } = useAuthContext()

    const [house, setHouse] = useState(null)

    useEffect(() => {

        if(user.user.statut === 'agent') {
            const ownHouses = houses && houses.filter(item => item.user_id === user.user._id)
            return setHouse(ownHouses)
        } 
        if(user.user.statut === 'client') {
            const favHouses2 = houses && houses.map(i => {
                if(!i.favorite.includes(user.user._id)) {
                    return null
                }
                return i
            })
            const favHouses1 = houses && houses.map((i) => {
                if(i.payment[0] === user.user._id) {
                    return i
                }
                return console.log('héhé')
            })
            let x = [...favHouses1, ...favHouses2]
            const y = [...new Set(x)]

            setHouse(y && y.filter(i => i !== null && i !== undefined))
        }

    }, [houses, user.user._id, user.user.statut])

  return (
    <div>
        <h1 className="text-center m-4">DashBoard</h1>
        {
            house && (
                <table className="table">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">Image</th>
                            <th scope="col">Adresse</th>
                            <th scope="col">Superfice / m2</th>
                            <th scope="col">Pièces</th>
                            <th scope="col">Prix / FCFA</th>
                            <th scope="col">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            house.map(i => {
                                if(i === null) {
                                    return ''
                                }
                                return (
                                    <tr key={`${i._id}tabrow`} className='text-center dashboardItem'>
                                        <th scope="row"><Link to={'/house/' + i._id}><img style={{width:'50px', height:'50px', borderRadius:'5px'}} src={i.imagePrincipale.url} alt={i.imagePrincipale.public_id} /></Link></th>
                                        <td><p className='mt-2'>{i.adresse}</p></td>
                                        <td><p className='mt-2'>{i.superficie}</p></td>
                                        <td><p className='mt-2'>{i.nombreChambre + i.nombreSalon}</p></td>
                                        <td><p className='mt-2'>{i.prix}</p></td>
                                        <td>{i.disponible ? (<p className='bg-success mt-2' style={{borderRadius:'10px'}}>Disponible</p>) : (i.payment[0] === user.user._id ? <p className='bg-warning mt-2' style={{borderRadius:'10px'}}>Pour toi</p> : <p className='bg-danger mt-2' style={{borderRadius:'10px'}}>Prise</p>)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        }
    </div>
  )
}

export default DashBoard