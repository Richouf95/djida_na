// import React from 'react'
// import { useEffect } from 'react'
// // import HouseCard from '../components/HouseCard'
// import { useHousesContext } from '../hooks/useHousesContext'
// import { Link } from 'react-router-dom'

// function Home() {

//     const {houses, dispatch} = useHousesContext()

//     useEffect(() => {
//         const fetechHouses = async () => {
//             const response = await fetch('/api/house')
//             const json = await response.json()

//             if(response.ok) {
//                 dispatch({
//                     type: 'SET_HOUSES',
//                     payload: json
//                 })
//             }
//         }
//         fetechHouses()
//     }, [dispatch])

//   return (
//     <div>
//         <h1 className='text-center my-5'>Trouver "LA" maison</h1>
//         <div>
//             {
//                 houses && houses.map((i, index) => {
//                     const position = index % 2;
//                     const houseC =    position === 1 ? (
//                         <div key={i._id} className='row m-4'>
//                             <div className="col-ms-12 order-sm-1 col-md-12 order-md-1 col-lg-6 order-lg-1">
//                                 <img src={i.imagePrincipale.url} alt={i.imagePrincipale.public_id} style={{width:'100%', borderRadius:'10px'}} />
//                             </div>
//                             <div className="col-ms-12 order-sm-2 col-md-12 order-md-2 col-lg-6 order-lg-1 d-flex justify-content-center align-items-center">
//                                 <div>
//                                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate placeat provident, nam ipsam in natus quaerat accusantium minus optio veniam quod obcaecati ipsa maiores molestiae corrupti porro id illo incidunt.</p>
//                                     <div style={{width:'100px', margin:'auto'}}><Link className='btn btn-dark' to={'/house/' + i._id}>Voir Plus</Link></div>
//                                 </div>
//                             </div>
//                         </div>
//                     ) : (
//                         <div key={i._id} className='row m-4'>
//                             <div className="col-sm-12 order-sm-2 col-md-12 order-md-2 col-lg-6 order-lg-1 d-flex justify-content-center align-items-center">
//                                 <div>
//                                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate placeat provident, nam ipsam in natus quaerat accusantium minus optio veniam quod obcaecati ipsa maiores molestiae corrupti porro id illo incidunt.</p>
//                                     <div style={{width:'100px', margin:'auto'}}><Link className='btn btn-dark' to={'/house/' + i._id}>Voir Plus</Link></div>
//                                 </div>
//                             </div>
//                             <div className="col-sm-12 order-sm-1 col-md-12 order-md-1 col-lg-6 order-lg-1">
//                                 <img src={i.imagePrincipale.url} alt={i.imagePrincipale.public_id} style={{width:'100%', borderRadius:'10px'}} />
//                             </div>
//                         </div>
//                     )
//                     return houseC
//                 })
//             }
//         </div>
//     </div>
//   )
// }

// export default Home



import React from 'react'
import { useEffect } from 'react'
import HouseCard from '../components/HouseCard'
import { useHousesContext } from '../hooks/useHousesContext'
import { useAuthContext } from '../hooks/useAuthContext'

function Home() {

    const {houses, dispatch} = useHousesContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetechHouses = async () => {
            const response = await fetch('/api/house', {
                headers:{
                    'Authorization': `Bearer ${user.userToken}`
                }
            })
            const json = await response.json()

            if(response.ok) {
                dispatch({
                    type: 'SET_HOUSES',
                    payload: json
                })
            }
        }

        if(user) {
            fetechHouses()
        }
    }, [dispatch, user])

  return (
    <div>
        <h1 className='text-center my-5'>Trouver "LA" maison</h1>
        <div>
            {
                Array.isArray(houses) && houses.map((i, index) => {
                    return <HouseCard key={`${i._id}housecard`} house={i} index={index} />
                })
            }
        </div>
    </div>
  )
}

export default Home