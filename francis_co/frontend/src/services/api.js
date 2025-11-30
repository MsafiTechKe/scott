import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });
export default api;
export const fetchProducts = ()=> api.get('/products').then(r=>r.data);
export const createCheckout = (payload)=> api.post('/orders/create-checkout-session', payload).then(r=>r.data);
