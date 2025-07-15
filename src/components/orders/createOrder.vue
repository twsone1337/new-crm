<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        text="+ Добавить заказ"
        class="ma-5"
        color="primary"
      >
        + Добавить заказ
      </v-btn>
    </template>
    <template #default>
      <v-card width="500">
        <v-toolbar title="Добавление заказа"></v-toolbar>
        <v-card-text>
          <v-text-field
            label="Имя заказчика"
            v-model="form.name"
          ></v-text-field>
          <div v-for="(item, idx) in form.items" :key="idx">
            <p class="text-gray-400">
              Товар
              <v-btn
                @click="deleteProduct(idx)"
                type="text"
                color="error"
                size="small"
                v-if="form.items.length > 1"
                >Удалить</v-btn
              >
            </p>

            <v-select
              :items="products"
              label="Товар"
              item-title="name"
              item-value="id"
              v-model="item.productId"
              @update:model-value="setProductPrice(idx)"
            />
            <v-text-field
              type="number"
              label="Количество"
              v-model="item.quantity"
              @update:model-value="changeQuantityToNumber(idx)"
            ></v-text-field>
          </div>
          <v-btn size="small" @click="addItem">Добавить товар</v-btn>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn text="Close" @click="dialog = false"></v-btn>
          <v-btn
            text="+ Создать заказ"
            color="primary"
            variant="flat"
            @click="createOrder"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useLoginStore } from '../../stores/store';
import axios from 'axios';
import { StatusEnum } from '../../types/orders';

const loginStore = useLoginStore();
const products = ref([]);
const emit = defineEmits(['updateOrder']);
const form = reactive({
  name: '',
  status: StatusEnum.PENDING,
  items: [
    // {
    //   quantity: 1,
    //   price: null,
    //   productId: '',
    // },
  ],
});
const dialog = ref(false);

const loadProducts = async () => {
  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  try {
    const { data } = await axios.get<any>(
      'http://localhost:3000/products',
      config
    );

    products.value = data;
  } catch (error) {}
};

const setProductPrice = (idx: number) => {
  console.log(idx);
  const product_id = form.items[idx].productId;
  const product_price = products.value.find(
    (item) => item.id === product_id
  )?.price;
  if (product_price) {
    form.items[idx].price = product_price;
  }
};

const changeQuantityToNumber = (idx: number) => {
  form.items[idx].quantity = Number(form.items[idx].quantity);
};

const addItem = () => {
  form.items.push({
    quantity: '',
    price: null,
    productId: '',
  });
};

const deleteProduct = (idx: number) => {
  form.items.splice(idx, 1);
};

const createOrder = async () => {
  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  const payload = form;
  try {
    await axios.post('http://localhost:3000/orders', payload, config);
    emit('updateOrder');
    dialog.value = false;
  } catch (error) {
    alert('Ошибка!');
  }
};

onMounted(() => {
  loadProducts();
});
</script>
