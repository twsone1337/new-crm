<template>
  <v-dialog transition="dialog-bottom-transition" width="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" text="Добавить упаковку" block></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card width="500">
        <v-toolbar title="Упаковка"></v-toolbar>

        <v-text-field
          class=""
          v-model="name"
          label="Название упаковки"
        ></v-text-field>

        <v-card-actions class="justify-end">
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
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

const createPackage = async () => {
  const payload = {
    name: name.value,
  };

  const config = {
    headers: { Authorization: `Bearer ${loginStore.token}` },
  };
  try {
    await axios.post('http://5.189.237.172:3000/packages', payload, config);
  } catch (error) {
    alert('Ошибка');
  }
};
</script>
