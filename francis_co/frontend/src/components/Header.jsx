import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(){
  return (
    <header className='py-4 bg-transparent'>
      <div className='container mx-auto flex items-center justify-between px-4'>
        <div className='flex items-center space-x-4'>
          <Link to='/' className='text-2xl font-bold' style={{color:'var(--accent)'}}>Scot</Link>
          <nav className='hidden md:flex space-x-4 text-sm'>
            <Link to='/'>Home</Link>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/admin'>Admin</Link>
          </nav>
        </div>
        <div className='flex items-center space-x-2'>
          <Link to='/login' className='px-3 py-1 rounded bg-[#01314a]'>Login</Link>
          <Link to='/register' className='px-3 py-1 rounded border border-[#024]'>Register</Link>
        </div>
      </div>
    </header>
  )
}
