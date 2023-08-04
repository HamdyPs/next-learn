"use client"

import axios from "axios"
import { useState } from "react"

const SignUpPage = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })

  const signUp = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post('/api/users/signup', user)
      console.log(response);
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
      <h2 style={{ textAlign: 'center' }}>sign up</h2>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        gap: 10,
        margin: '50px 0px'
      }}
        onSubmit={signUp}>
        <input style={{
          padding: '10px 20px',
          width: 400
        }}
          type="text"
          placeholder='username'
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          value={user.username}
          id='username' />

        <input style={{
          padding: '10px 20px',
          width: 400
        }}
          type="text"
          placeholder='email'
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          value={user.email}
          id='email' />

        <input style={{
          padding: '10px 20px',
          width: 400
        }}
          type="password"
          placeholder='password'
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
          id='password' />

        <button style={{
          padding: '10px 20px',
          width: 400,
          cursor: 'pointer'
        }}
          type="submit">sign up</button>
      </form>
    </div>
  )
}

export default SignUpPage
