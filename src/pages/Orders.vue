<template>
  <div>Заказы</div>
  <createOrder @update-order="loadOrders" />
  <div v-if="!loginStore.user">
    <h1>Авторизуйтесь, чтобы увидеть заказы</h1>
  </div>
  <div v-else>
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
      <template #item.actions="{ item }">
        <v-btn
          size="x-small"
          icon
          variant="outlined"
          color="grey"
          class="rounded-lg"
        >
          <v-icon icon="mdi-dots-vertical" color="black"></v-icon>

          <v-menu
            activator="parent"
            location="bottom end"
            transition="fade-transition"
          >
            <v-list density="compact" min-width="250" rounded="lg" slim>
              <v-list-item
                prepend-icon="mdi-check"
                title="Подтвердить оплату"
                base-color="green"
                @click="changeStatus(StatusEnum.PAYED, item.id)"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-close"
                title="Отменить заказ"
                base-color="red"
                @click="changeStatus(StatusEnum.CANCELLED, item.id)"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-clock-time-eight-outline"
                title="Ожидание"
                base-color="blue"
                @click="changeStatus(StatusEnum.PENDING, item.id)"
              ></v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-data-table-server>
    <!-- jops -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from '../stores/store';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import type { IUser } from '../types/user';
import CreateOrder from '../components/orders/createOrder.vue';
import type { StatusEnum } from '../types/orders';
dayjs.locale('ru'); // для русского языка

const orders = ref([]);
const loginStore = useLoginStore();
const loadOrders = async () => {
  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  try {
    const { data } = await axios.get<any>(
      'http://localhost:3000/orders',
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
    value: (i: IUser) => dayjs(i.created_at).format('dddd, HH:mm'),
  },
  { title: 'Ответственный', key: 'user' },
  { title: 'Товары', key: 'items' },
  { title: 'Сумма', key: 'total' },
  { title: 'Статус', key: 'status' },
  { title: 'Действия', key: 'actions' },
]);

const changeStatus = (status: StatusEnum, id: string) => {
  console.log(status, id);
};
</script>
