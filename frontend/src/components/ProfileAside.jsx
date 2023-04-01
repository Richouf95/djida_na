import React from 'react'
import PPP from '../images/profilelogo.png'
import HouseForm from '../components/HouseForm'

function ProfileAside({status, data}) {

  return (
    <div style={{background:'white', padding:'20px', borderRadius:'20px'}}>
        <h1>ProfileAside</h1>
        <h2>Status : {status}</h2>
        <div style={{display:'flex', justifyContent:'center'}}>
          <img src={PPP} alt="" />
        </div>
        <div>
          <h3>Nom : {data.name}</h3>
          <h3>Tel : {data.tel}</h3>
          <h3>Email : {data.email}</h3>
        </div>
        {
          status === 'Agent' ?  
          <div>
            <div className='d-flex justify-content-center mt-4'>
               <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Ajouter une nouvelle maison
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
                    <HouseForm />
                  </div>
                </div>
              </div>
            </div>
          </div> : ''
        }
    </div>
  )
}

export default ProfileAside