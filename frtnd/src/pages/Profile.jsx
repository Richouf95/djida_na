import React from 'react'
import { useEffect, useState } from 'react'
import DashBoard from '../components/DashBoard'
import PhotoProfile from '../images/profilelogo.png'
import HouseForm from '../components/HouseForm'
import { useAuthContext } from '../hooks/useAuthContext'

function Profile() {

  const { user } = useAuthContext()
  const [proposition, setProposition] = useState('')

  useEffect(() => {
    const fetechTheAgent = async () => {
      const response = await fetch('/api/proposition')
      const data = await response.json()

      if(response.ok) {
        setProposition(data)
      }
    }

    fetechTheAgent()
  }, [])

  return (
    <div>
        <h1 className='text-center my-5'>Profile</h1>
        <div className="row">
          <div className="col-xs-12 col-md-4 my-1">
            {
              user && (
                <div className='bg-light p-3' style={{borderRadius:'20px'}}>
                  <div className='d-flex justify-content-center align-items-center my-4'>
                    <img style={{width:'50%'}} src={PhotoProfile} alt="Photo_Profile" />
                  </div>
                  <div style={{width:'80%', margin:'auto'}}>
                    <h5>Nom : {user.user.name}</h5>
                    <h5>Tel : {user.user.tel}</h5>
                    <h5>Email : {user.user.email}</h5>
                  </div>
                  {
                    user && user.user.statut === 'agent' && (
                      <div className='d-flex justify-content-center mt-3'>
                        {/* <!-- Button trigger modal --> */}
                        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                          Ajouter une maison
                        </button>

                        {/* <!-- Modal --> */}
                        <div className="modal fade" id="staticBackdrop" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                      </div>
                    )
                  }
                </div>
              )
            }
          </div>
          <div className="col-xs-12 col-md-8 bg-light p-3 my-1" style={{borderRadius:'20px'}}>
            <DashBoard proposition={proposition} />
          </div>
        </div>
    </div>
  )
}

export default Profile