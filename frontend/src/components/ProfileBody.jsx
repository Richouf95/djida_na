import React from 'react'
import { useHousesContext } from '../hooks/useHousesContext'
import {Link} from 'react-router-dom'

function ProfileBody({status, data}) {

  const {houses} = useHousesContext()
  
  return (
    <div style={{background:'white', padding:'20px', borderRadius:'20px'}}>
        <h1 className='text-center'>DashBoard</h1>
        <table className="table">
          <thead>
            <tr style={{textAlign:'center'}}>
              <th scope="col">Image</th>
              <th scope="col">Adresse</th>
              <th scope="col">Superficie / m2</th>
              <th scope="col">Prix /F CFA</th>
              <th scope="col">Statut</th>
            </tr>
          </thead>
          <tbody>
            {
              houses ? houses.map(i => {
                return (
                    <tr key={i._id} style={{textAlign:'center', borderRadius:'10px'}}>
                      <th scope="row">
                        <Link to={'/house/' + i._id}><img style={{width:'50px', height:'50px'}} src={i.imagePrincipale.url} alt="" /></Link>
                      </th>
                      <td><Link to={'/house/' + i._id}>{i.adresse}</Link></td>
                      <td><Link to={'/house/' + i._id}>{i.superficie}</Link></td>
                      <td><Link to={'/house/' + i._id}>{i.prix}</Link></td>
                      <td><Link to={'/house/' + i._id}>Dispo / Indispo</Link></td>
                    </tr>
                  
                )
              }) : ''
            }
            
          </tbody>
        </table>
    </div>
  )
}

export default ProfileBody