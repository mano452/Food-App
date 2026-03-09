'use client'
import React, { useEffect, useState } from 'react'
import { FiLogIn, FiUserPlus } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    const fetchLogin = async () => {
      const res = await fetch('/api/user')
      const data = await res.json()
      console.log('User API response:', data)

      if (data.user) {
        setUser(data.user)
      }
    }

    fetchLogin()
  }, [])

  return (
    <header className='py-4'
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>

        {/* Logo */}
        <a href="#" style={{
          fontWeight: 'bold',
          fontSize: '2rem',
          background: 'linear-gradient(90deg,#3f51b5,#2196f3)',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}>
          QuickBite
        </a>

        {/* If user logged in */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: '600', color: '#3f51b5' }}>
              Hello, {user.name}
            </span>
          </div>
        ) : (

          /* If not logged in */
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => router.push('/login')}
              style={{
                border: '1px solid #3f51b5',
                color: '#3f51b5',
                borderRadius: '50rem',
                padding: '0.5rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              <FiLogIn size={18} /> Login
            </button>

            <button
              onClick={() => router.push('/register')}
              style={{
                border: 'none',
                background: 'linear-gradient(90deg,#3f51b5,#2196f3)',
                color: 'white',
                borderRadius: '50rem',
                padding: '0.5rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <FiUserPlus size={18} /> Sign Up
            </button>
          </div>

        )}

      </div>
    </header>
  )
}

export default Header