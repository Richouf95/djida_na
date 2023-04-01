import React from 'react'
import { useEffect } from 'react'
import HouseCard from '../components/HouseCard'
// import HouseForm from '../components/HouseForm'
import { useHousesContext } from '../hooks/useHousesContext'

function Home() {

    const {houses, dispatch} = useHousesContext()

    useEffect(() => {
        const fetechHouses = async () => {
            const response = await fetch('/api/house')
            const json = await response.json()

            if(response.ok) {
                dispatch({
                    type: 'SET_HOUSES',
                    payload: json
                })
            }
        }
        fetechHouses()
    }, [dispatch])

  return (
    <div>
        
        <div>
            <div className='hehe' style={{display:'flex', flexWrap:'wrap', margin:'auto'}}>
                {
                    houses && houses.map(i => {
                        return <HouseCard key={i._id} house={i} />
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Home