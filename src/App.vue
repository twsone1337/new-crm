<template>
  <v-layout class="rounded rounded-md border">
    <Sidebar />
    <Header />

    <v-main class="d-flex align-center justify-center" height="300">
      <v-container>
        <router-view></router-view>
        <!-- <v-sheet 
          border="dashed md"
          color="surface-light"
          height="200"
          rounded="lg"
          width="100%"
        ></v-sheet> -->
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import Header from './components/navigation/Header.vue';
import Sidebar from './components/navigation/Sidebar.vue';
</script>
