import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardCustomer(){
  const [orders,setOrders]=useState([]);
  useEffect(()=>{
    axios.get('/api/admin/orders').then(r=>setOrders(r.data)).catch(()=>{})
  },[]);
  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Customer Dashboard (demo)</h2>
      <div className='bg-[#021024] p-4 rounded'>
        <h3 className='font-semibold'>Recent orders</h3>
        <ul className='mt-3 space-y-2'>
          {orders.map(o=> <li key={o.id} className='p-2 rounded bg-[#011524]'>Order #{o.id} — ${o.total} — {o.status}</li>)}
        </ul>
      </div>
    </div>
  )
}
