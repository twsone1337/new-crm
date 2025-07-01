<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        text="Редактировать"
        class="ma-5"
        color="primary"
        border
      >
      </v-btn>
    </template>
    <template #default>
      <v-card width="500">
        <v-toolbar title="Редактирование продукта"></v-toolbar>
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
            @click="editProduct"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, reactive } from 'vue';
import { useLoginStore } from '../../stores/store';

const loginStore = useLoginStore();
const dialog = ref(false);
const packages = ref([]);
const products = ref([]);
const emit = defineEmits(['update-items']);
const props = defineProps<{ id: number }>();

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

const loadItem = async () => {
  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  try {
    const { data } = await axios.get(
      `http://5.189.237.172:3000/products/${props.id}`,
      config
    );

    products.value = data;
  } catch (error) {
    alert('Ошибка в получении продуктов!');
  }
};

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
    console.log('Это продукты:', products);
  } catch (error) {
    alert('Ошибка в получении упаковок!');
  }
};

const editProduct = async () => {
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
    await axios.patch(
      `http://5.189.237.172:3000/products/${props.id}`,
      payload,
      config
    );
    emit('update-items');
    dialog.value = false;
  } catch (error) {
    alert('Ошибка в отправке продукта!');
  }
};

onMounted(() => {
  loadPackages();
  loadItem();
});
</script>
