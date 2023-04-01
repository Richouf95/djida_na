import React from 'react'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const { login, err, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, pwd);
    }

  return (
    <div style={{height: '100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <form style={{width:'400px'}} onSubmit={handleSubmit}>
            <h3 className='mb-4'>Log In</h3>

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

            <button disabled={isLoading} className='btn btn-dark w-100 mt-4'>Log In</button>
            <Link className='btn w-100 mt-3' to="/signup">Pas de compte ? Inscrivez vous</Link>
            {
                err && <div className='error'>{err}</div>
            }
        </form>
    </div>
  )
}

export default Login