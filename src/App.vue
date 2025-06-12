<script setup>
import AppLayout from "./components/Layout/AppLayout.vue";
</script>

<template>
  <div class="app-container">
    <AppLayout>
      <RouterView v-slot="{ Component }">
        <keep-alive include="FormPage">
          <component :is="Component" />
        </keep-alive>
      </RouterView>
    </AppLayout>
  </div>
</template>



