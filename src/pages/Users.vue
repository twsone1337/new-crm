<template>
  <div>Пользователи</div>
  <v-data-table-server
    class="mt-5"
    hide-default-header
    :headers="headers"
    :items="users"
    :items-length="users.length"
    @update:options="loadItems"
  >
    <template #item.id="{ item }">
      <v-chip size="small" label variant="outlined">
        {{ item.id }}
      </v-chip>
    </template>
    <template #item.avatar="{ item }">
      <v-avatar color="grey" class="mr-2">
        <v-img
          v-if="item.avatar"
          :src="`http://5.189.237.172:3000/${item.avatar}`"
        ></v-img>
        <span v-else> {{ item.name[0] }}</span>
      </v-avatar>
    </template>
    <template #item.role="{ item }">
      <v-chip color="pink-lighten-2" size="small" label variant="outlined">
        {{ item.role }}
      </v-chip>
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useLoginStore } from '../stores/store';
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';
import type { IUser } from '../types/user';

const loginStore = useLoginStore();

const loadItems = async () => {
  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  try {
    const { data } = await axios.get('http://5.189.237.172:3000/users', config);

    users.value = data;
    console.log(users);
  } catch (error) {}
};

const users = ref<IUser[]>([]);
const headers = ref<any>([
  { title: 'Аватар', key: 'avatar' },
  { title: 'ID', key: 'id' },
  { title: 'Имя пользователя', key: 'name' },
  {
    title: 'Создан',
    key: 'created_at',
    value: (i: IUser) => dayjs(i.created_at).format('DD.MM.YYYY'),
  },
  { title: 'Роль', key: 'role' },
]);

onMounted(() => {
  loadItems();
});
</script>

<style scoped></style>
