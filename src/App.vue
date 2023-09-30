<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/store/user-store'

const userStore = useUserStore();

onMounted(async () => {
  try {
    await userStore.fetchCurrentUser();
  } catch (error) {
    console.log(error)
  }
})
</script>