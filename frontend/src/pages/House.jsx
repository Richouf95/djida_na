import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ViewImgSecondaire from '../components/ViewImgSecondaire'
import PhotoAgent from '../images/profilelogo.png'
import HouseFormUpdate from '../components/HouseFormUpdate'

function House() {

  const params = useParams()

  const [house, setHouse] = useState(null)
  const [agent, setAgent] = useState(null)

  useEffect(() => {
    const fetchTheHouse = async () => {
      const response = await fetch('/api/house/' + params.id);
      const data = await response.json()

      if(response.ok) {
        setHouse(data)
      }
    }
    const fetechTheAgent = async () => {
      const response = await fetch('/api/agent/640a7d56a0cd040469d0f4d9')
      const data = await response.json()

      if(response.ok) {
        setAgent(data)
      }
    }

    fetchTheHouse()
    fetechTheAgent()
  }, [params])

  const ImgSecondaire = house && house.imageSecondaire && <div style={{background:'white'}} className="col-12 my-4 rounded d-flex flex-wrap justify-content-center">
  {
    house.imageSecondaire.map(i => {
      return <ViewImgSecondaire key={i} data={i}  />
    })
  }
</div>

  return (
    <div style={{marginTop:'50px'}}>
      <h1 className='text-center mt-3'>Maison selectionnée</h1>

      <div className='row mt-4'>
          {/* Info House */}
          <div className="col-xs-12 col-md-9">
            <div className='row'>
              {/* Info Image Principale & House */}
              <div className="col-12">
                <div className="row">
                  {/* Info Image Principale */}
                  <div className="col-xs-12 col-lg-12 col-xl-8">
                    <img className='img-fluid' style={{width:'100%', height:'100%'}} src={house !== null ? house.imagePrincipale.url : ''} alt={house !== null ? house.imagePrincipale.public_id : ''} />
                  </div>

                  {/* Info house */}
                  <div className="col-xs-12 col-lg-12 col-xl-4">
                    <div style={{border:"1px solid white", margin:'20px auto', borderRadius:'10px', padding:'10px',background:'white'}}>
                      <h1 className='text-center'>Details</h1>
                      <div>
                        <hr/>
                      </div>
                      {
                        house ? 
                        <div>
                          <h3>Adresse : {house.adresse}</h3>
                          <h3>Superficie : {house.superficie} m2</h3>
                          <h3>Nombre de chambre : {house.nombreChambre}</h3>
                          <h3>Nombre de Salon : {house.nombreSalon}</h3>

                          <div className='ddd' style={{display:'flex', alignItems:"center"}}>
                            {house.coursUnique === true ? <span className="mx-3 material-symbols-outlined  text-success fs-2 fw-bold">check_circle</span> : <span className="mx-3 material-symbols-outlined  text-danger fs-2 fw-bold">unpublished</span>}
                            <h3>Cours Unique </h3>
                          </div>
                          <div className='ddd' style={{display:'flex', alignItems:"center"}}>
                            {house.dependance === true ? <span className="mx-3 material-symbols-outlined  text-success fs-2 fw-bold">check_circle</span> : <span className="mx-3 material-symbols-outlined  text-danger fs-2 fw-bold">unpublished</span>}
                            <h3>Dépendace </h3>
                          </div>
                          <div className='ddd' style={{display:'flex', alignItems:"center"}}>
                            {house.jardin === true ? <span className="mx-3 material-symbols-outlined  text-success fs-2 fw-bold">check_circle</span> : <span className="mx-3 material-symbols-outlined  text-danger fs-2 fw-bold">unpublished</span>}
                            <h3>Jardin </h3>
                          </div>
                          <div className='ddd' style={{display:'flex', alignItems:"center"}}>
                            {house.piscine === true ? <span className="mx-3 material-symbols-outlined  text-success fs-2 fw-bold">check_circle</span> : <span className="mx-3 material-symbols-outlined  text-danger fs-2 fw-bold">unpublished</span>}
                            <h3>Piscine </h3>
                          </div>
                          <div className='my-4 text-center text-bg-warning d-flex justify-content-center align-items-center p-1'>
                            <span className="material-symbols-outlined">payments</span>
                            <h2 style={{margin:'0'}}>Coût : {house.prix} F CFA</h2>
                          </div>
                          <div style={{display:"flex", justifyContent:'center'}}>
                            <button className='btn btn-warning w-50'>Prendre</button>
                          </div>
                          <div>
                          </div>
                        </div> : ''
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Images Secondaire */}
              <div>
                <div className='d-flex justify-content-center mt-4'>
                  <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Modifier les Images Secondaires
                  </button>
                </div>
            
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        {
                          house ? <HouseFormUpdate house={house}/> : ""
                        }
                      </div>
                    </div>
                  </div>
                </div>
              {
                ImgSecondaire
              }
              </div>
              
            </div>
          </div>

          {/* Info Agent */}
          <div className="col-xs-12 col-md-3">
            {
              agent ? <div style={{border:"1px solid white", margin:'20px auto', borderRadius:'10px', padding:'10px', background:'white'}}>
              <h1 className='text-center my-3'>Agent</h1>
              <div className='my-5' style={{margin:'auto', width:'80%', display:'flex', justifyContent:'center'}}>
                <img style={{width:'90%'}} src={PhotoAgent} alt='AgentPhoto'/>
              </div>
              <div className='my-5'>
                <h3>Nom : {agent.name}</h3>
                <h3>tel : {agent.tel}</h3>
                <h3>Email : {agent.email}</h3>
              </div>
              <div className='my-3'>
                <button style={{background:'#ecae12'}} className='btn w-100'>Contacter</button>
              </div>
            </div> : ''
            }
          </div>
      </div>
    </div>
    
  )
}

export default House