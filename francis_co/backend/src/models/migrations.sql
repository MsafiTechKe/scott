CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password_hash TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  summary TEXT,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_email TEXT,
  total NUMERIC(10,2) NOT NULL,
  stripe_pid TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now()
);
