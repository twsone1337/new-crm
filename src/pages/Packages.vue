<template>
  <div class="mt-5">
    <div>Упаковки</div>
    <createPackageModule @update-items="loadItems" />
    <v-data-table-server
      :headers="headers"
      :items="packages"
      :items-length="packages.length"
      @update:options="loadItems"
    >
      <template #item.actions="{ item }">
        <v-btn color="error" @click="deletePackage(item.id)">Удалить</v-btn>
      </template></v-data-table-server
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from '../stores/store';
import axios from 'axios';
import createPackageModule from '../components/packages/createPackageModule.vue';

const loginStore = useLoginStore();
const packages = ref<any>([]);

const loadItems = async () => {
  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  try {
    const { data } = await axios.get<any>(
      'http://5.189.237.172:3000/packages',
      config
    );

    packages.value = data;
  } catch (error) {}
};

const deletePackage = async (id: number) => {
  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  try {
    await axios.delete(`http://5.189.237.172:3000/packages/${id}`, config);
    // Обновить список после удаления
  } catch (error) {
    console.error('Ошибка при удалении упаковки', error);
  } finally {
    loadItems();
  }
};

const headers = ref<any>([
  { title: 'ID Упаковки', key: 'id' },
  { title: 'Название', key: 'name' },
  { title: 'Создано', key: 'createdAt' },
  { title: 'Отредактировано', key: 'updateddAt' },
  { title: 'Действия', key: 'actions', sortable: false },
]);
</script>
