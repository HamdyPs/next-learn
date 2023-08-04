'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
const Navbar = () => {
  const router = useRouter()
  const logout = async () => {
    try {
      const response = await axios.get('/api/users/logout')
      console.log(response);
      router.push('/login')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 5,
      padding: '10px 8%'
    }}>
      <h2>logo</h2>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20
      }}>
        <Link href='/'>Home</Link>
        <Link href='/profile'>profile</Link>
        <Link href='/login'>login</Link>
        <Link href='/signup'>sign up</Link>
        <button
          style={{
            backgroundColor: 'red',
            color: '#fff',
            cursor: 'pointer'
          }}
          onClick={() => logout()}>logout</button>
      </div>
    </div>
  )
}

export default Navbar
