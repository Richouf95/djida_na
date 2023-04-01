import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import ViewSecondariImages from '../components/ViewImgSecondaire'
import { useHousesContext } from '../hooks/useHousesContext'
import HouseFormUpdate from '../components/HouseFormUpdate'
import AddImgSnd from '../components/HouseSndImagesForm'
import StripeCheckout from 'react-stripe-checkout'
import { useAuthContext } from '../hooks/useAuthContext'

function HouseDetail() {

    const params = useParams().id

    const [house, setHouse] = useState(null)
    const {houses, dispatch} = useHousesContext()
    // const [user, setUser] = useState(null)
    const { user } = useAuthContext()
    const [isUpdate, setIsUpdate] = useState(false)
    const [proposition, setProposition] = useState(false)

    if(isUpdate) {
        window.location.reload();
        setIsUpdate(false)
    }

    useEffect(() => {

        if(Array.isArray(houses)) {
            const theHouse = houses.filter(i => i._id === params)
            setHouse(theHouse[0]);
        } 
        
        const fetechPropositions = async () => {
            const response = await fetch('/api/proposition')
            const json = await response.json()

            if(response.ok) {
                setProposition(json)
            }
        }
        fetechPropositions()

      }, [house, params, houses])

      let propositonFirstFilter = proposition && proposition.filter(i => i.house._id === house._id)

      let propositonsecondFilter = propositonFirstFilter[0]

      let propositonThridFilter = propositonsecondFilter && propositonsecondFilter.house.user_id === user.user._id


      console.log(propositonThridFilter && propositonThridFilter);

        const addfavorite = async () => {

            if(!user) {
                return
            }

            if(!house.favorite.includes(user.user._id)) {
                alert("Ajouter aux favorite")
                const res = await fetch('/api/house/' + house._id, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        favorite: [...house.favorite, user.user._id]
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.userToken}`
                    }
                })
                const json = await res.json()
    
                if(res.ok) {
                    dispatch({type:'UPDATE_HOUSE', payload: json})
                }
            } else {
                alert("Retirer des favorite")
                let t = house.favorite;
                let i = user.user._id
                const tt = t.filter(item => item !== i)
                const res = await fetch('/api/house/' + house._id, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        favorite: tt
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.userToken}`
                    }
                })
                const json = await res.json()

                if(res.ok) {
                    dispatch({type:'UPDATE_HOUSE', payload: json})
                }
            }
            
        }

      const handleDeletee = async () => {
        if(!user) {
            return
        }
        const response = await fetch('/api/house/' + params, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.userToken}`
            }
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type:'DELETE_HOUSE', payload: json})
        }
      }

      const handleToken = async (token) => {

        if(!user) {
            return
        }

        const user_id = user.user._id

        // Opération achat
        const response = await fetch('/api/proposition', {
            method: 'POST',
            body: JSON.stringify({token, house, user_id}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.user.userToken}`
            }
        })
        const json = await response.json()

        if(!response.ok) {
            console.log(json.error)
        }

        if(response.ok) {
            alert('Félicitation! Achat effectué')
            console.log(json);
        }

        // Opération Disponibilité
        const dispo = await fetch('/api/house/' + house._id, {
            method:'PATCH',
            body: JSON.stringify({
                disponible: false,
                payment: user_id
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.userToken}`
            }
        })
        const houseUpdated = await dispo.json()

        if(!dispo.ok) {
            console.log(houseUpdated.error)
        }

        if(dispo.ok) {
            console.log('Cette maison n\'est plus disponible');
        }

      }

  return (
    <div>
        <h1 className='text-center m-5'>Details de la maison</h1>
        {
            house && (
                <div className="row">
                    <div className="col-sm-12 order-sm-1 col-lg-6 order-lg-3">
                        <img src={house.imagePrincipale.url} alt={house.imagePrincipale.public_id} style={{width:'100%', borderRadius:'10px', height:'100%'}} />
                    </div>
                    <div className="col-sm-12 order-sm-3 col-lg-6 order-lg-3" style={{background:'white', borderRadius:'20px'}}>
                        <h2 className='text-center m-3'>Adresse : {house.adresse}</h2>
                        <div className='mt-5' style={{width:'95%', margin:'auto',padding:'10px', justifyContent:'center'}}>
                            <h4 className='d-flex justify-content-center align-items-center'><span className="material-symbols-outlined mx-2  fs-2 fw-bold">crop</span>Superficie : {house.superficie} m2</h4>
                            <h4 className='d-flex justify-content-center align-items-center'><span className="material-symbols-outlined mx-2  fs-2 fw-bold">door_open</span>Nombre de pièce : {house.nombreChambre + house.nombreSalon}</h4>
                        </div>
                        <div style={{width:'95%', margin:'auto', display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                            <div>
                                <h4 className='d-flex justify-content-center m-4 align-items-center'>{house.coursUnique ? (<span className="material-symbols-outlined mx-2 fs-2 fw-bold text-success">check_circle</span>) : (<span className="material-symbols-outlined mx-2 fs-2 fw-bold text-danger">check_circle</span>)}Cours unique </h4>
                                <h4 className='d-flex justify-content-center m-4 align-items-center'>{house.dependance ? (<span className="material-symbols-outlined mx-2 fs-2 fw-bold text-success">check_circle</span>) : (<span className="material-symbols-outlined mx-2 fs-2 fw-bold text-danger">check_circle</span>)}Dépendance</h4>
                            </div>
                            <div>
                                <h4 className='d-flex justify-content-center m-4 align-items-center'>{house.jardin ? (<span className="material-symbols-outlined mx-2 fs-2 fw-bold text-success">check_circle</span>) : (<span className="material-symbols-outlined mx-2 fs-2 fw-bold text-danger">check_circle</span>)}Jardin</h4>
                                <h4 className='d-flex justify-content-center m-4 align-items-center'>{house.piscine ? (<span className="material-symbols-outlined mx-2 fs-2 fw-bold text-success">check_circle</span>) : (<span className="material-symbols-outlined mx-2 fs-2 fw-bold text-danger">check_circle</span>)}Piscine</h4>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <h4 className='d-flex justify-content-center mx-4 align-items-center'><span className="material-symbols-outlined mx-2 fs-2 fw-bold">payments</span>Prix : {house.prix} F CFA</h4>
                        </div>
                        <div className='d-flex justify-content-center my-5'>
                            {
                                user && (
                                    user.user.statut === 'client' ? (
                                        <>
                                            <button onClick={addfavorite} className='btn btn-dark w-50 mx-2 d-flex justify-content-center'><span className="material-symbols-outlined mx-2">favorite</span>Ajouter aux favoris</button>
                                            {
                                                house && house.disponible ? (
                                                    <StripeCheckout
                                                        stripeKey='pk_test_51MmkguJj12xocKrG6OIyOUTCLHOQJmpeFyKRCZdxZAdGFKPSbmDPfZ7cofTi1O8ZYmerRmsxmzxTabj7VVmR7JUb00Qcd0Ibya'
                                                        token={handleToken}
                                                        amount={house.prix * 100}
                                                        name={house.adresse}
                                                        billingAddress
                                                        shippingAddress
                                                    />
                                                ) : (
                                                    <StripeCheckout
                                                        disabled
                                                        stripeKey='pk_test_51MmkguJj12xocKrG6OIyOUTCLHOQJmpeFyKRCZdxZAdGFKPSbmDPfZ7cofTi1O8ZYmerRmsxmzxTabj7VVmR7JUb00Qcd0Ibya'
                                                        token={handleToken}
                                                        amount={house.prix * 100}
                                                        name={house.adresse}
                                                        billingAddress
                                                        shippingAddress
                                                    />
                                                )
                                            }
                                            {/* <button onClick={prendre} type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrophhh" className='btn btn-dark w-50 mx-2 d-flex justify-content-center'><span className="material-symbols-outlined mx-2">real_estate_agent</span>Prendre</button> */}
                                        </>
                                    ) : (
                                            user.user._id === house.user_id && (
                                                <div className='d-block' style={{width:'100%'}}>
                                                    <div className='d-flex'>
                                                        <Link to='/profile' onClick={handleDeletee} className='btn btn-dark w-50 mx-2 d-flex justify-content-center'><span className="material-symbols-outlined mx-2">delete</span>Supprimer</Link>
                                                        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModalhhh" className='btn btn-dark w-50 mx-2 d-flex justify-content-center'><span className="material-symbols-outlined mx-2">recycling</span>Modifier</button> <br/>
                                                    </div>
                                                    <div className='d-flex justify-content-center mt-4'>
                                                        {
                                                            propositonThridFilter && (
                                                                <>
                                                                    <button type="button" className="btn btn-dark w-25" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                                        Locataire
                                                                    </button>

                                                                    
                                                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                        <div className="modal-dialog">
                                                                            <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Infos du locataire</h1>
                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <h2>Nom : {propositonsecondFilter.token.card.name}</h2>
                                                                                <h4>Email : {propositonsecondFilter.token.email}</h4>
                                                                                <h4>Adresse : {propositonsecondFilter.token.card.address_country} - {propositonsecondFilter.token.card.address_line1}</h4>
                                                                                <h4>BP : {propositonsecondFilter.token.card.address_zip}</h4>
                                                                                <h4>Paie par : {propositonsecondFilter.token.type}</h4>
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                <button type="button" className="btn btn-primary">Save changes</button>
                                                                            </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            )
                                    )
                                )
                            }
                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="exampleModalhhh" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <HouseFormUpdate houseToUpdate={house} updateInfo={newInfo => setHouse(newInfo)} />
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-sm-12 bg-light p-3 order-sm-2 col-lg-12 order-lg-3 my-3 d-flex flex-wrap justify-content-center">
                        <div className='row'>
                            <div className="col-12 d-flex justify-content-center">
                                {
                                    user && user.user.statut === 'agent' && user.user._id === house.user_id && ( 
                                    <>
                                        <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop222" className='btn btn-dark w-100 mx-2 d-flex justify-content-center'><span className="material-symbols-outlined mx-2">recycling</span>Ajouter des images</button> 
                                        <div className="modal fade" id="staticBackdrop222" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Ajouter une image</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <AddImgSnd houseToUpdate={house} />
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </>
                                    )
                                }
                            </div>
                            <div className="col-sm-12 order-sm-2 col-lg-12 order-lg-3 my-3 d-flex flex-wrap justify-content-center" style={{background:'white', borderRadius:'20px'}}>
                            {
                                    Array.isArray(house.imageSecondaire) && house.imageSecondaire.map((i, index) => {
                                    return <ViewSecondariImages key={index} data={i} />
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default HouseDetail