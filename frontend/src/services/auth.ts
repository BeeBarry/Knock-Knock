
import { apiRequest } from './api';
import { Account, AccountDTO } from '../types/backend';

export const authService = {
  async login(credentials: AccountDTO): Promise<Account> {
    return apiRequest<Account>('/Login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async register(credentials: AccountDTO): Promise<Account> {
    return apiRequest<Account>('/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async getByUsername(username: string): Promise<Account> {
    return apiRequest<Account>(`/username/${username}`);
  }
};
