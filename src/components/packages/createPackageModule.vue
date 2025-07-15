<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <!-- Кнопка для вызова модального окна добавления упаковки -->
      <v-btn
        v-bind="activatorProps"
        text="Добавить упаковку"
        class="ma-5"
        color="primary"
      ></v-btn>
      <!-- Кнопка для удаления всех упаковок -->
      <v-btn color="error" @click="deleteAllPackages">
        Удалить все упаковки
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card width="500">
        <v-toolbar title="Упаковка"></v-toolbar>

        <v-text-field v-model="name" label="Название упаковки"></v-text-field>

        <v-card-actions class="justify-end">
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
          <!-- Кнопка для добавления упаковки -->
          <v-btn
            text="Добавить"
            color="primary"
            variant="flat"
            @click="createPackage"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from '../../stores/store';
import axios from 'axios';

const name = ref('');
const loginStore = useLoginStore();
const emit = defineEmits(['update-items']);

const createPackage = async () => {
  const payload = {
    name: name.value,
  };

  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  try {
    await axios.post('http://localhost:3000/packages', payload, config);
    emit('update-items');
    dialog.value = false;
  } catch (error) {
    alert('Ошибка');
  }
};

const deleteAllPackages = async () => {
  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  try {
    if (confirm('Вы действительно хотите удалить все упаковки?')) {
      await axios.delete('http://localhost:3000/packages', config);
      alert('Все упаковки удалены');
      // здесь можно обновить локальный список упаковок или сделать запрос заново
    }
  } catch (error) {
    alert('Ошибка при удалении');
  }
};

const dialog = ref(false);
</script>
