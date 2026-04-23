import { useState, useEffect, useCallback } from 'react';
// import api from '../services/api';

export interface PriceHistory {
  id: number;
  price: number;
  date: string;
}

export interface Product {
  id: number;
  url: string;
  name: string;
  imageUrl: string;
  currentPrice: number;
  priceDrop: boolean;
  history: PriceHistory[];
}

export function usePriceData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Quando a API estiver pronta, descomente:
      // const response = await api.get('/api/products');
      // setProducts(response.data);
      
      // Mock data temporário para exibir a interface até o backend ser conectado
      setProducts([
        {
          id: 1,
          name: "Sony PlayStation 5 Console",
          url: "https://example.com/ps5",
          imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=400",
          currentPrice: 449.99,
          priceDrop: true,
          history: [
            { id: 1, price: 499.99, date: "2023-10-01" },
            { id: 2, price: 499.99, date: "2023-10-15" },
            { id: 3, price: 479.99, date: "2023-11-01" },
            { id: 4, price: 449.99, date: "2023-11-10" }
          ]
        },
        {
          id: 2,
          name: "Apple MacBook Pro 14\"",
          url: "https://example.com/macbook",
          imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400",
          currentPrice: 1999.00,
          priceDrop: false,
          history: [
            { id: 1, price: 1999.00, date: "2023-10-01" },
            { id: 2, price: 1999.00, date: "2023-10-15" },
            { id: 3, price: 1999.00, date: "2023-11-01" },
            { id: 4, price: 1999.00, date: "2023-11-10" }
          ]
        }
      ]);
      
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addUrl = async (url: string) => {
    try {
      setError(null);
      // const response = await api.post('/api/products', { url });
      // await fetchProducts();
      
      // Mock de adição
      console.log("Adicionando URL:", url);
      return new Promise<void>((resolve) => setTimeout(resolve, 1000));
    } catch (err: any) {
      setError(err.message || 'Failed to add URL');
      throw err;
    }
  };

  return { products, isLoading, error, fetchProducts, addUrl };
}
