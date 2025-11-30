import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({product}){
  return (
    <div className='bg-[#021024] rounded-md p-4 shadow-md'>
      <img src={product.image_url || 'https://via.placeholder.com/400x250'} alt='' className='w-full h-40 object-cover rounded' />
      <h3 className='mt-3 font-semibold'>{product.name}</h3>
      <p className='text-sm opacity-80'>{product.summary}</p>
      <div className='mt-3 flex items-center justify-between'>
        <div className='font-bold'>${product.price}</div>
        <Link to={'/product/'+product.id} className='px-3 py-1 rounded bg-[#01314a]'>View</Link>
      </div>
    </div>
  )
}
