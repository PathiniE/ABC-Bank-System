import axios from 'axios';

// API base URL - can be changed based on environment
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Data types that match your backend models
export interface User {
  nic: string;
  fname: string;
  lname: string;
  email: string;
  telNo: string;
  noOfDependents: number;
  graduated: boolean;
  selfEmployed: boolean;
  annualIncome: number;
  creditScore: number;
  assets: number;
}

export interface Account {
  accId: number;
  user: User;
  accountType: string;
  balance: number;
  isAccountActive: boolean;
}

export interface Loan {
  loanId: number;
  user: User;
  type: string;
  amount: number;
  loanTerm: number;
  isLoanApproved: boolean;
  isLoanPaid: boolean;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  // Get token from localStorage (client-side only)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// API endpoints
export const authApi = {
  login: (credentials: { username: string; password: string }) => 
    api.post('/auth/login', credentials),
  register: (userData: { username: string; password: string; email: string }) => 
    api.post('/auth/register', userData),
  me: () => api.get('/auth/me'),
};

export const accountsApi = {
  getAll: () => api.get('/accounts'),
  getById: (id: string | number) => api.get(`/accounts/${id}`),
  create: (accountData: Partial<Account>) => api.post('/accounts', accountData),
  update: (id: string | number, accountData: Partial<Account>) => api.put(`/accounts/${id}`, accountData),
  delete: (id: string | number) => api.delete(`/accounts/${id}`),
};

export const loansApi = {
  getAll: () => api.get('/loans'),
  getById: (id: string | number) => api.get(`/loans/${id}`),
  create: (loanData: Partial<Loan>) => api.post('/loans', loanData),
  update: (id: string | number, loanData: Partial<Loan>) => api.put(`/loans/${id}`, loanData),
  delete: (id: string | number) => api.delete(`/loans/${id}`),
};

export default api;