<template>
  <v-navigation-drawer>
    <v-list nav>
      <v-list-item v-if="loginStore.user">
        <v-avatar color="grey" class="mr-2">
          <v-img
            v-if="loginStore.user.avatar"
            :src="`http://5.189.237.172:3000/${loginStore.user.avatar}`"
          ></v-img>
          <span v-else> {{ loginStore.user.name[0] }}</span>
        </v-avatar>
        {{ loginStore.user.email }}
      </v-list-item>

      <v-list-item title="Заказы" to="/"

      </v-list-item>
      <v-list-item title="Продукты" to="/products"></v-list-item>
      <v-list-item title="Упаковки" to="/packages"></v-list-item>
      <v-btn
        color="green"
        to="/login"
        v-if="!loginStore.user"
        size="small"
        block
        class="pa-5"
        >Вход
      </v-btn>
      <v-list-item
        title="Пользователи"
        to="/users"
        v-if="loginStore.user"
      ></v-list-item>
      <v-btn
        @click="logout"
        v-if="loginStore.user"
        size="small"
        color="red"
        block
        class="pa-5"
        >Выход</v-btn
      >
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useLoginStore } from '../../stores/store';
import { useRouter } from 'vue-router';

const loginStore = useLoginStore();
const router = useRouter();

function logout() {
  // очистить токен и пользователя
  loginStore.$reset(); // сброс состояния store (т.к. persist включен)

  // перейти на страницу логина
  router.push('/login');
}
</script>
