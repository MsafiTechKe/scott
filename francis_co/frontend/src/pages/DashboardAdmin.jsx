import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardAdmin(){
  const [stats,setStats]=useState(null);
  useEffect(()=>{ axios.get('/api/admin/stats').then(r=>setStats(r.data)).catch(()=>{}) },[]);
  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Admin Dashboard (demo)</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='p-4 bg-[#021024] rounded'>Products: {stats?.products ?? '—'}</div>
        <div className='p-4 bg-[#021024] rounded'>Customers: {stats?.customers ?? '—'}</div>
      </div>
    </div>
  )
}
