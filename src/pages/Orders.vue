<template>
  <div>Заказы</div>
  <!-- <createOrder /> -->

  <v-data-table-server
    :headers="headers"
    :items="orders"
    :items-length="orders.length"
    @update:options="loadOrders"
  >
    <template #item.user="{ item }">
      <v-chip size="x-small" label variant="outlined" class="mr-1">
        {{ item.user.id }}
      </v-chip>
      <b>{{ item.user.email }}</b>
    </template>
    <template #item.items="{ item }">
      <v-chip v-for="(product, index) in item.items" :key="index">
        {{ product.product.name }} - {{ product.quantity }}шт
      </v-chip>
    </template>

    <template #item.status="{ item }">
      <v-chip color="red">
        {{ item.status }}
      </v-chip>
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from '../stores/store';
import axios from 'axios';
import dayjs from 'dayjs';

// import createOrder from '../components/orders/createOrder.vue';

const orders = ref([]);
const loginStore = useLoginStore();
const loadOrders = async () => {
  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  try {
    const { data } = await axios.get<any>(
      'http://5.189.237.172:3000/orders',
      config
    );

    orders.value = data.orders;
  } catch (error) {
    alert('Ошибка получения заказов!');
  }
};

const headers = ref<any>([
  { title: 'Заказчик', key: 'name' },
  {
    title: 'Дата',
    key: 'createdAt',
    value: (i: IUser) => dayjs(i.created_at).format('dddd, h:mm A'),
  },
  { title: 'Ответственный', key: 'user' },
  { title: 'Товары', key: 'items' },
  { title: 'Сумма', key: 'total' },
  { title: 'Статус', key: 'status' },
  { title: 'Действия', key: 'actions' },
]);
</script>
