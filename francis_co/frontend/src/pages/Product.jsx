import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Product(){
  const { id } = useParams();
  const [p,setP] = useState(null);
  useEffect(()=>{ axios.get('/api/products/'+id).then(r=>setP(r.data)).catch(()=>{}) },[id]);
  if(!p) return <div>Loading...</div>;
  return (
    <div className='grid md:grid-cols-2 gap-6 items-start'>
      <img src={p.image_url || 'https://via.placeholder.com/600x400'} alt='' className='rounded' />
      <div>
        <h1 className='text-2xl font-bold'>{p.name}</h1>
        <p className='mt-2 opacity-90'>{p.description || p.summary}</p>
        <div className='mt-4'>
          <div className='text-3xl font-bold mb-4'>${p.price}</div>
          <button className='px-4 py-2 rounded bg-[#00b4d8] text-black'>Add to cart (demo)</button>
        </div>
      </div>
    </div>
  )
}
