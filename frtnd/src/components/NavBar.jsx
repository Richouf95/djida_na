import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

function NavBar() {

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className='row' style={{display: 'flex', alignItems:'center', justifyContent:'space-around'}}>
      <div className='col-12 col-md-6' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div>
          <img style={{width:'70px', height:'70px'}} src='/logoimmo.webp' alt="logo" />
        </div>
        <Link to="/"><h1>Djida'Na</h1></Link>
      </div>
      <div id='separete'></div>
      <div className=' navlist col-12 col-md-6 d-flex align-items-center justify-content-center'>
        {
          user && (
            <div className='d-flex align-items-center'>
              <Link to="/">Houses</Link>
              <Link to="/profile">Profile</Link>
              <span className='fs-1 mx-2'>|</span>
              <div className='d-flex align-items-center'>
                <span className="material-symbols-outlined">account_circle</span>
                <span>{user.email}</span>
                <button className='btn btn-warning mx-3' onClick={handleLogout}>Log out</button>
              </div>
            </div>
          )
        }
        {/* {
          !user && (
            <div>
              <Link to="/login">Login</Link>
            </div>
          )
        } */}
        
      </div>
    </nav>
  )
}

export default NavBar