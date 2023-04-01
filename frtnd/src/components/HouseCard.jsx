import React from 'react'
import {Link} from 'react-router-dom'

function HouseDetail({house, index}) {

    const position = index % 2;

  return (
    <>
        {
            position === 1 ? (
                <div className='row m-4'>
                    <div className="col-ms-12 order-sm-1 col-md-12 order-md-1 col-lg-6 order-lg-1">
                        <img src={house.imagePrincipale.url} alt={house.imagePrincipale.public_id} style={{width:'100%', borderRadius:'10px'}} />
                    </div>
                    <div className="col-ms-12 order-sm-2 col-md-12 order-md-2 col-lg-6 order-lg-1 d-flex justify-content-center align-items-center">
                        <div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate placeat provident, nam ipsam in natus quaerat accusantium minus optio veniam quod obcaecati ipsa maiores molestiae corrupti porro id illo incidunt.</p>
                            <div style={{width:'100px', margin:'auto'}}><Link className='btn btn-dark' to={'/house/' + house._id}>Voir Plus</Link></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='row m-4'>
                    <div className="col-sm-12 order-sm-2 col-md-12 order-md-2 col-lg-6 order-lg-1 d-flex justify-content-center align-items-center">
                        <div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate placeat provident, nam ipsam in natus quaerat accusantium minus optio veniam quod obcaecati ipsa maiores molestiae corrupti porro id illo incidunt.</p>
                            <div style={{width:'100px', margin:'auto'}}><Link className='btn btn-dark' to={'/house/' + house._id}>Voir Plus</Link></div>
                        </div>
                    </div>
                    <div className="col-sm-12 order-sm-1 col-md-12 order-md-1 col-lg-6 order-lg-1">
                        <img src={house.imagePrincipale.url} alt={house.imagePrincipale.public_id} style={{width:'100%', borderRadius:'10px'}} />
                    </div>
                </div>
            )
        }
    </>
  )
}

export default HouseDetail