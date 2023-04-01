import React from 'react'
import { Link } from 'react-router-dom'

function HouseCard({house}) {
  return (
    <div className="card" style={{minWidth: '350px', maxWidth: '350px', margin:'30px auto'}}>
        <img style={{maxHeight:'250px'}} src={house.imagePrincipale.url} className="card-img-top" alt={house.imagePrincipale.public_id} />
        <div className="card-body">
            <h5 className="card-title">Adresse : {house.adresse}</h5>
            <div className='cardFavoris'>
                <span style={{fontSize:'2.7em'}} className="material-symbols-outlined">favorite</span>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100px', maxHeight:'100px', flexWrap:'wrap'}}>
                {
                    house.superficie && <div className='bulleInfo'><span tabIndex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover" className="material-symbols-outlined ">crop</span><p>{house.superficie}</p></div>
                }
                {
                    house.nombreChambre && house.nombreSalon ? <div className='bulleInfo'><span className="material-symbols-outlined">meeting_room</span><p>{house.nombreChambre + house.nombreSalon}</p></div> : ''
                }
                {
                    house.coursUnique ? <div className='bulleInfo'><span className="material-symbols-outlined">real_estate_agent</span></div> : ''
                }
                {
                    house.dependance ? <div className='bulleInfo'><span className="material-symbols-outlined">villa</span></div> : ''
                }
                {
                    house.jardin ? <div className='bulleInfo'><span className="material-symbols-outlined">grass</span></div> : ''
                }
                {
                    house.piscine ? <div className='bulleInfo'><span className="material-symbols-outlined">pool</span></div> : ''
                }
            </div>
            <div className='divPrixCard'>
                <span className="material-symbols-outlined">payments</span>
                <p>{house.prix} FCFA</p>
            </div>
            <Link className="btn btn-primary w-100" to={'/house/' + house._id}>Voir plus</Link>
        </div>
    </div>
  )
}

export default HouseCard