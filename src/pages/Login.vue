<template>
  <div>
    <div class="ma-auto w-25">
      <v-text-field label="Login" v-model="login"></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        v-model="password"
      ></v-text-field>
      <v-btn block color="primary" @click="textToConsole">Войти</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useLoginStore } from '../stores/store';
import { useRouter } from 'vue-router';
const loginStore = useLoginStore();

const router = useRouter();
const login = ref('');
const password = ref('');

async function textToConsole() {
  const payload = {
    email: login.value,
    password: password.value,
  };
  try {
    const { data } = await axios.post(
      'http://localhost:3000/auth/login',
      payload
    );
    loginStore.token = data.token;
    getMe();
    router.replace('/');
    console.log('Вы успешно авторизованы!');
  } catch (error) {
    alert('Ошибка!');
  }
}

async function getMe() {
  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  try {
    const { data } = await axios.get('http://localhost:3000/auth/me', config);
    loginStore.user = data;
  } catch (error) {
    alert('Ошибка');
  }
}
</script>
