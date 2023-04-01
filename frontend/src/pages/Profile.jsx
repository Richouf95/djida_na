import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ProfileAside from '../components/ProfileAside'
import ProfileBody from '../components/ProfileBody'

function Profile() {

  const [status, setStatus] = useState('User')
  const [data, setData] = useState('')

  useEffect(() => {
    const fetchClient = async () => {
      const res = await fetch('/api/client/640a8997598811a2d88f3984')
      const data = await res.json()

      if(res.ok) {
        setData(data)
      }
    }
    const fetchAgent = async () => {
      const res = await fetch('/api/agent/640a7d56a0cd040469d0f4d9')
      const data = await res.json()

      if(res.ok) {
        setData(data)
      }
    }
    if(status === 'User') fetchClient()
    if(status === 'Agent') fetchAgent()
  }, [status])

  return (
    <div className='container' style={{background:'rgb(236, 236, 236)'}}>
        <h1 className='text-center my-5' onClick={() => {
          if(status === 'User') setStatus('Agent')
          if(status === 'Agent') setStatus('User')
        }}>Profile</h1>
        <div className='row'>
          <div className='col-xs-12 col-lg-4'>
              {
                status === 'User' ? (<ProfileAside  data={data} status={status} />) : (<ProfileAside data={data}  status={status} />)
              }
          </div>
          <div className='col-xs-12 col-lg-8'>
            {
              status === 'User' ? (<ProfileBody  data={data} status={status} />) : (<ProfileBody  data={data} status={status} />)
            }
          </div>
        </div>
    </div>
  )
}

export default Profile