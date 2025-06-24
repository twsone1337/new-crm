<template>
  <div>Упаковки</div>
  <v-data-table-server
    class="mt-10"
    :headers="headers"
    :items="packages"
    :items-length="packages.length"
    @update:options="loadItems"
  ></v-data-table-server>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from '../stores/store';
import axios from 'axios';

const loginStore = useLoginStore();
const packages = ref([]);

const loadItems = async () => {
  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  try {
    const { data } = await axios.get(
      'http://5.189.237.172:3000/packages',
      config
    );

    packages.value = data;
  } catch (error) {}
};

const headers = ref([
  { title: 'ID Упаковки', key: 'id' },
  { title: 'Название', key: 'name' },
  { title: 'Создано', key: 'createdAt' },
  { title: 'Отредактировано', key: 'updateddAt' },
]);
</script>
