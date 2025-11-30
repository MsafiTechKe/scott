import React, { useEffect, useState } from 'react';
import ThreeHero from '../components/ThreeHero';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Home(){
  const [products,setProducts] = useState([]);
  useEffect(()=>{ axios.get('/api/products').then(r=>setProducts(r.data)).catch(()=>{}) },[]);
  return (
    <div>
      <ThreeHero />
      <section className='mt-8'>
        <h2 className='text-2xl font-semibold mb-4'>Featured Products</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map(p=> <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
