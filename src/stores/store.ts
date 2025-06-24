import { defineStore } from 'pinia';

interface ILogin {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
    created_at: string;
    updatedd_at: string;
  } | null;
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
