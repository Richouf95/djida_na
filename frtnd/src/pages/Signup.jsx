import React from 'react'
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { Link } from 'react-router-dom'

function Signup() {

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [name, setName] = useState('')
    const [tel, setTel] = useState('')
    // const [statut, setstatut] = useState('')
    const { signup, isLoading, err } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const statut = 'client'

        await signup(email, pwd, name, tel, statut)
    }

  return (
    <div style={{height: '100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <form style={{width:'400px'}} onSubmit={handleSubmit}>
            <h3 className='mb-4'>Sign Up</h3>

            <label className='form-label'>Nom :</label>
            <input 
                type="text" 
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='form-control mb-3'
            />
            <label className='form-label'>Tel :</label>
            <input 
                type="number" 
                onChange={(e) => setTel(e.target.value)}
                value={tel}
                className='form-control mb-3'
            />
            <label className='form-label'>Email :</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='form-control mb-3'
            />
            <label className='form-label'>PassWord :</label>
            <input 
                type="password" 
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                className='form-control mb-3'
            />

            <button disabled={isLoading} className='btn btn-dark w-100 mt-4'>Sign Up</button>
            <Link className='btn w-100 mt-3' to="/login">Vous avez déjà un compte ? Connexion</Link>
            {
                err && <div className='error'>{err}</div>
            }
        </form>
    </div>
  )
}

export default Signup