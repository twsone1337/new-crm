import { defineStore } from 'pinia';
import type { IUser } from '../types/user';

interface ILogin {
  token: string;
  user: IUser | null;
}
export const useLoginStore = defineStore('login', {
  state: (): ILogin => {
    return {
      token: '',
      user: null,
    };
  },
  getters: {},
  actions: {},
  persist: true,
});
