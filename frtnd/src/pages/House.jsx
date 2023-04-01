import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
// import ViewSecondariImages from '../components/ViewImgSecondaire'
import { useHousesContext } from '../hooks/useHousesContext'
// import HouseFormUpdate from '../components/HouseFormUpdate'
import AddImgSnd from '../components/HouseSndImagesForm'

function HouseDetail() {

    const params = useParams().id

    const [house, setHouse] = useState(null)
    const {houses, dispatch} = useHousesContext()
    const [user, setUser] = useState(null)

    // pour le form 
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

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    useEffect(() => {
        if(houses) {
            const theHouse = houses.filter(i => i._id === params)
            setHouse(theHouse[0]);
        }

        const fetechTheUser = async () => {
          const response = await fetch('/api/client/6414804bff1714535b73bfa3')
          const data = await response.json()
    
          if(response.ok) {
            setUser(data)
          }
        }
    
        fetechTheUser()

        if(house) {
          setAdresse(house.adresse)
          setSuperficie(house.superficie)
          setNombreChambre(house.nombreChambre)
          setNombreSalon(house.nombreSalon)
          setCoursUnique(house.coursUnique)
          setDependance(house.dependance)
          setJardin(house.jardin)
          setPiscine(house.piscine)
          setPrix(house.prix)
          setDisponible(house.disponible)
      }

      }, [params, houses, house])

        const addfavorite = async () => {

            if(!user.favorite.includes(house._id)) {
                alert("Ajouter aux favorite")
                const res = await fetch('/api/client/' + user._id, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        favorite: [...user.favorite, house._id]
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const json = await res.json()
    
                if(res.ok) {
                    dispatch({type:'UPDATE_HOUSE', payload: json})
                    console.log(json)
                }
            } else {
                alert("Retirer des favorite")
                let t = user.favorite;
                let i = house._id
                const tt = t.filter(item => item !== i)
                console.log(tt)
                const res = await fetch('/api/client/' + user._id, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        favorite: tt
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const json = await res.json()

                if(res.ok) {
                    dispatch({type:'UPDATE_HOUSE', payload: json})
                    console.log(json)
                }
            }
            
        }

      const handleDeletee = async () => {
        const response = await fetch('/api/house/' + params, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type:'DELETE_HOUSE', payload: json})
        }
      }

      const prendre = () => {

      }

      const handleSubmitHouseUpdated = async (e) => {
        e.preventDefault()

        const houseNewData = {
            adresse, 
            superficie, 
            nombreChambre, 
            nombreSalon, 
            coursUnique, 
            dependance, 
            jardin, 
            piscine, 
            prix,
            disponible
        }

        const response = await fetch('/api/house/' + house._id, {
            method: 'PATCH',
            body: JSON.stringify(houseNewData),
            headers: {
                'Content-Type': 'application/json'
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
                                    user.statut === 'client' ? (
                                        <>
                                            <button onClick={addfavorite} className='btn btn-dark w-50 mx-2 d-flex justify-content-center'><span className="material-symbols-outlined mx-2">favorite</span>Ajouter aux favoris</button>
                                            <button onClick={prendre} type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrophhh" className='btn btn-dark w-50 mx-2 d-flex justify-content-center'><span className="material-symbols-outlined mx-2">real_estate_agent</span>Prendre</button>
                                        </>
                                    ) : (
                                        <>
                                            <Link to='/profile' onClick={handleDeletee} className='btn btn-dark w-50 mx-2 d-flex justify-content-center'><span className="material-symbols-outlined mx-2">delete</span>Supprimer</Link>
                                            <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrophhh" className='btn btn-dark w-50 mx-2 d-flex justify-content-center'><span className="material-symbols-outlined mx-2">recycling</span>Modifier</button>
                                        </>
                                    )
                                )
                            }
                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="staticBackdrophhh" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                <form onSubmit={handleSubmitHouseUpdated}>
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
                                  <button type="submit" className="btn btn-dark w-100">Valider</button>
                                  {
                                      error && <div>{error}</div>
                                  }
                              </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Understood</button>
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
                                    user && user.statut === 'agent' && ( <>
                                        <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop222" className='btn btn-dark w-100 mx-2 d-flex justify-content-center'><span className="material-symbols-outlined mx-2">recycling</span>Modifier les images</button> 
                                        <div className="modal fade" id="staticBackdrop222" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <AddImgSnd houseToUpdate={house} />
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
                                house.imageSecondaire.map((i, index) => {
                                    return (
                                      <div>
                                          {/* <!-- Button trigger modal --> */}
                                          <div style={{width:'150px',height:'150px', margin:'10px'}} data-bs-toggle="modal" data-bs-target={`#${i}`}>
                                              <img style={{width:'100%', height:'100%', borderRadius:'10px'}} src={i} alt="" />
                                          </div>

                                          {/* <!-- Modal --> */}
                                          <div className="modal fade" id={i} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                              <div className="modal-dialog" style={{minWidth:'90%'}}>
                                                  <div style={{height:'90vh'}} className="modal-content">
                                                      <div className='d-flex justify-content-end p-2'>
                                                          <button type="button" className="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button>
                                                      </div>
                                                      <div className="modal-body d-flex justify-content-center">
                                                          <img style={{width:'80%', height:'90%'}} src={i} alt="" />
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                    )
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