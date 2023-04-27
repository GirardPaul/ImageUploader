<script setup>
const props = defineProps({
  message: String,
  iconName: {
    type: String,
    default: "done",
  },
  type: {
    type: String,
    default: "info",
  },
});
</script>
<template>
  <div class="toast flex align-center justify-between" :class="type">
    <p>{{ message }}</p>
    <div class="circle-icon flex justify-center align-center">
      <span class="material-icons" :class="type">{{ iconName }}</span>
    </div>
  </div>
</template>

<style scoped>
.circle-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #fff;
}

.material-icons {
  color: white;
  font-size: 1rem;
}
.toast {
  opacity: 0.9;
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 1rem;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  transition: opacity 0.3s ease-in-out;
  width: 20rem;
}

.material-icons.info {
  color: #3498db;
}
.material-icons.success {
  color: #2ecc71;
}
.material-icons.error {
  color: #e74c3c;
}

.toast.info {
  background-color: #3498db;
}

.toast.success {
  background-color: #2ecc71;
}

.toast.error {
  background-color: #e74c3c;
}

.toast.show {
  opacity: 1;
}
</style>
