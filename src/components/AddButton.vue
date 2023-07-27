<template>
  <span class="w-14">
    <button id="plusBut" @click="$emit('toggle')">
      <i id="ico" class="pi pi-plus-circle"></i>
    </button>
  </span>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css'

defineEmits(['toggle'])
</script>
<style scoped>
#plusBut:hover {
  box-shadow: 0px 0px 1px 1px rgba(157, 29, 168, 0.3);
}

#ico:hover {
  color: #962785;
}

#ico {
  font-size: 2rem;
  color: #a2148d;
}

#plusBut {
  border-radius: 100%;
  margin-left: 8px;
  width: 50px;
  height: 50px;
  background-color: rgb(16, 16, 16);
  /* box-shadow: 0px 0px 5px 5px rgba(157, 29, 168, 0.3); */
}
</style>
