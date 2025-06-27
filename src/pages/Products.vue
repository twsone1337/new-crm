<template>
  <div>
    Продукты
    <createNewProduct @update-items="loadItems" />
  </div>

  <v-data-table-server
    class="mt-40"
    :headers="headers"
    :items="products"
    :items-length="products.length"
    @update:options="loadItems"
  >
    <template #item.weightOrVolume="{ item }">
      {{ item.weightOrVolume }} {{ item.unit }}
    </template></v-data-table-server
  >
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useLoginStore } from '../stores/store';
import createNewProduct from '../components/packages/createNewProduct.vue';

const loginStore = useLoginStore();
const products = ref([]);

const loadItems = async () => {
  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  try {
    const { data } = await axios.get(
      'http://5.189.237.172:3000/products',
      config
    );

    products.value = data;
  } catch (error) {}
};
const headers = ref([
  { title: 'ID Упаковки', key: 'id' },
  { title: 'Название', key: 'name' },
  { title: 'Описание', key: 'description' },
  { title: 'Количество', key: 'quantity' },
  { title: 'Цена', key: 'price' },
  { title: 'Вес или объем', key: 'weightOrVolume' },
  { title: 'Создано', key: 'createdAt' },
  { title: 'Отредактировано', key: 'updateddAt' },
]);
</script>
