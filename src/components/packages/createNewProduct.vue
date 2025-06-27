<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        text="Добавить продукт"
        class="ma-5"
        color="primary"
      >
        Добавить продукт
      </v-btn>
    </template>
    <template #default>
      <v-card width="500">
        <v-toolbar title="Упаковка"></v-toolbar>
        <v-card-text>
          <v-text-field v-model="form.name" label="Название" />
          <v-text-field v-model="form.description" label="Описание" />
          <v-select
            label="Упаковка"
            :items="packages"
            item-title="name"
            item-value="id"
            v-model="form.packageId"
          />
          <v-text-field
            v-model="form.quantity"
            label="Количество"
            type="number"
          />
          <v-text-field v-model="form.price" label="Цена" type="number" />
          <v-text-field
            v-model="form.weightOrVolume"
            label="Вес/Объем"
            type="number"
          />
          <v-text-field v-model="form.unit" label="Единица измерения" />
          <v-text-field v-model="form.expire" label="Срок годности" />
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn text="Close" @click="dialog = false"></v-btn>
          <!-- Кнопка для добавления продукта -->
          <v-btn
            text="Добавить"
            color="primary"
            variant="flat"
            @click="createProduct"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import { useLoginStore } from '../../stores/store';

const loginStore = useLoginStore();
const dialog = ref(false);
const emit = defineEmits(['update-items']);

const form = reactive({
  name: '',
  description: '',
  quantity: 0,
  price: 0,
  weightOrVolume: 0,
  unit: '',
  expire: '',
  packageId: null,
});

const packages = ref([]);

const loadPackages = async () => {
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

const createProduct = async () => {
  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  const payload = {
    ...form,
    quantity: Number(form.quantity),
    price: Number(form.price),
    weightOrVolume: Number(form.weightOrVolume),
  };
  try {
    await axios.post('http://5.189.237.172:3000/products', payload, config);
    emit('update-items');
    dialog.value = false;
  } catch (error) {
    alert('Ошибка!');
  }
};

onMounted(() => {
  loadPackages();
});
</script>
