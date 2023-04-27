<script setup>
import { ref } from "vue";
import ImageUploader from "./layouts/ImageUploader.vue";
const showToast = ref(false);
const toggleToast = () => {
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 10000);
};
</script>

<template>
  <Toast v-if="showToast" type="success" message="Lien copié !" />
  <ImageUploader @showToast="toggleToast" />
</template>

<style scoped></style>
