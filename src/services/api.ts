/**
 * Base API client configuration and fetch wrapper.
 * Prepares the application for real backend endpoints.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.studiohub.local/v1';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('studiohub_auth_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || `Erro na requisição: ${response.statusText}`);
  }

  return response.json();
}
