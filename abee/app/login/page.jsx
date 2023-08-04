"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const LoginPage = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const router = useRouter()


  const login = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post('/api/users/login', user)
      console.log(response);
      router.push('/profile')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div style={{
      width: '60%',
      margin: ' 5% auto',
      height: '500px',
    }}>
      <h2 style={{ textAlign: 'center' }}>login</h2>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        gap: 10,
        margin: '50px 0px'
      }}
        onSubmit={login}>
        <input style={{
          padding: '10px 20px',
          width: 400
        }}
          type="text"
          placeholder='email'
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input style={{
          padding: '10px 20px',
          width: 400
        }}
          type="password"
          placeholder='password'
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button style={{
          padding: '10px 20px',
          width: 400,
          cursor: 'pointer'
        }}
          type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginPage
