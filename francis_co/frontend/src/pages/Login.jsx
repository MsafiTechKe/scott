import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [err,setErr]=useState(null);
  const navigate = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    try{
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('scot_token', data.token);
      navigate('/dashboard');
    }catch(e){ setErr(e.response?.data?.error || e.message) }
  };

  return (
    <div className='max-w-md mx-auto bg-[#021024] p-6 rounded'>
      <h2 className='text-xl font-semibold mb-4'>Login</h2>
      {err && <div className='bg-red-600 p-2 rounded mb-2'>{String(err)}</div>}
      <form onSubmit={submit} className='space-y-3'>
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' className='w-full p-2 rounded bg-[#011524]' />
        <input required value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' type='password' className='w-full p-2 rounded bg-[#011524]' />
        <div className='flex justify-end'>
          <button className='px-4 py-2 rounded bg-[#00b4d8] text-black'>Login</button>
        </div>
      </form>
    </div>
  );
}
