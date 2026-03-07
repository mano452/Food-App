'use client'
import React from 'react';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
const Header = () => {
  const router = useRouter();
  return (
    <header className='py-4' style={{
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      boxShadow: '0 2px 15px rgba(0, 0, 0, 0.08)',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 0rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo/Brand */}
        <a href="#" style={{
          fontWeight: 'bold',
          fontSize: '2rem',
          background: 'linear-gradient(90deg, #3f51b5, #2196f3)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textDecoration: 'none'
        }}>
          QuickBite
        </a>

        {/* Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          

          {/* Auth Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginLeft: '1rem' }}>
            <button onClick={()=>{
              router.push('/login')
            }} style={{
              border: '1px solid #3f51b5',
              color: '#3f51b5',
              borderRadius: '50rem',
              padding: '0.5rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              cursor: 'pointer'
            }}>
              <FiLogIn size={18} /> Login
            </button>
            <button onClick={()=>{
              router.push('/register')
            }} style={{
              border: 'none',
              background: 'linear-gradient(90deg, #3f51b5, #2196f3)',
              color: 'white',
              borderRadius: '50rem',
              padding: '0.5rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              boxShadow: '0 1px 10px rgba(63, 81, 181, 0.3)'
            }}>
              <FiUserPlus size={18} /> Sign Up
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;