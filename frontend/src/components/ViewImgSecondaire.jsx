import React from 'react'

function ViewImgSecondaire({data}) {
  return (
    <div>
        {/* <!-- Button trigger modal --> */}
        <div style={{width:'150px',height:'150px', margin:'10px'}} data-bs-toggle="modal" data-bs-target={`#${data}`}>
            <img style={{width:'100%', height:'100%', borderRadius:'10px'}} src={data} alt="" />
        </div>

        {/* <!-- Modal --> */}
        <div className="modal fade" id={data} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div></div>
            <div className="modal-dialog" style={{minWidth:'90%'}}>
                <div className="modal-content">
                    <div className='d-flex justify-content-end p-2'>
                        <button type="button" className="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex justify-content-center">
                        <img style={{width:'50%', height:'50%'}} src={data} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewImgSecondaire