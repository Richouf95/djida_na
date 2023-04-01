import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav style={{display: 'flex', alignItems:'center', justifyContent:'space-around'}}>
      <div>
        <h1>Djida'Na</h1>
      </div>
      <div>
        <Link to="/">Houses</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/">Favoris</Link>
      </div>
    </nav>
  )
}

export default NavBar