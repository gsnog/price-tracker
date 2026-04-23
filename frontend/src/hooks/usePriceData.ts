import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export interface PriceHistory {
  id: number;
  price: number;
  date: string;
}

export interface Product {
  id: number;
  urlProduto: string;
  ultimoPreco: number;
  status: string;
  history?: PriceHistory[];
}

export interface User {
  id: number;
  nome: string;
  email: string;
  telegramChatId: string | null;
}

export function usePriceData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get('/api/user/me');
      setUser(response.data);
      return true;
    } catch (err: any) {
      setUser(null);
      return false;
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get('/alertas');
      // Adicionando um array de histórico falso temporário apenas para o gráfico não quebrar, 
      // já que a API ainda não retorna a tabela de histórico (PriceHistory)
      const data = response.data.map((p: any) => ({
        ...p,
        history: p.ultimoPreco ? [
          { id: 1, price: p.ultimoPreco * 1.1, date: new Date(Date.now() - 86400000 * 7).toISOString() },
          { id: 2, price: p.ultimoPreco, date: new Date().toISOString() }
        ] : []
      }));
      setProducts(data);
    } catch (err: any) {
      if (err.response?.status !== 401) {
        setError(err.message || 'Failed to fetch products');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const init = useCallback(async () => {
    setIsLoading(true);
    const loggedIn = await fetchUser();
    if (loggedIn) {
      await fetchProducts();
    } else {
      setIsLoading(false);
    }
  }, [fetchUser, fetchProducts]);

  useEffect(() => {
    init();
  }, [init]);

  const addUrl = async (urlProduto: string) => {
    try {
      setError(null);
      await api.post('/alertas', { urlProduto });
      await fetchProducts();
    } catch (err: any) {
      setError(err.message || 'Failed to add URL');
      throw err;
    }
  };

  const updateTelegram = async (chatId: string) => {
    try {
      const response = await api.put('/api/user/telegram', { telegramChatId: chatId });
      setUser(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to update Telegram ID');
      throw err;
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${api.defaults.baseURL}/oauth2/authorization/google`;
  };

  return { user, products, isLoading, error, addUrl, updateTelegram, loginWithGoogle };
}
