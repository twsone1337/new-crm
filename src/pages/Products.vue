<template>
  <div>
    Продукты
    <createNewProduct @update-items="loadItems" />
  </div>

  <v-row>
    <v-col cols="3" v-for="product in products"
      ><v-card class="mx-auto">
        <v-card-item>
          <v-card-title> {{ product.name }}</v-card-title>

          <v-card-subtitle>
            <span class="me-1">{{ product.description }}</span>
          </v-card-subtitle>
        </v-card-item>

        <div class="px-4 mb-2">
          <v-chip class="ma-1">Цена - {{ product.price }}р</v-chip>

          <v-chip class="ma-1">Количество - {{ product.quantity }}шт</v-chip>

          <v-chip class="ma-1"
            >Вес/Объем - {{ product.weightOrVolume }}{{ product.unit }}</v-chip
          >

          <v-chip class="ma-1">Срок хранения - {{ product.expire }}</v-chip>
          <v-chip class="ma-1">{{ product.package?.name }}</v-chip>
        </div>

        <v-card-actions>
          <editProductModule :id="product.id" @update-items="loadItems" />
        </v-card-actions> </v-card
    ></v-col>
  </v-row>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useLoginStore } from '../stores/store';
import createNewProduct from '../components/packages/createNewProduct.vue';
import editProductModule from '../components/packages/editProductModule.vue';

const loginStore = useLoginStore();
const products = ref([]);

const loadItems = async () => {
  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  try {
    const { data } = await axios.get('http://localhost:3000/products', config);

    products.value = data;
  } catch (error) {}
};

onMounted(() => {
  loadItems();
});
</script>
