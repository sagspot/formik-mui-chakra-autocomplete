import axios from 'axios';

interface Props {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  data?: Record<string, any>;
}

const api = axios.create({ baseURL: 'http://localhost:3000' });

export const fetcher = async <T = any>(url: string, props?: Props) => {
  const method = props?.method ?? 'GET';

  const data = props?.data ?? undefined;

  try {
    const res = await api<T>({ method, url, data });
    return res.data;
  } catch (error) {
    throw error;
  }
};
