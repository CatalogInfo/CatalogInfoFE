<template>
  <div class="">
    <button id="plusBut" @click="$emit('toggle')">
      <i id="ico" class="pi pi-plus-circle"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
// import Button from 'primevue/button'
import 'primeicons/primeicons.css'

defineEmits(['toggle'])
</script>
<style scoped>
#plusBut:hover {
  box-shadow: 0px 0px 5px 5px rgba(157, 29, 168, 0.3);
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

  width: 50px;
  height: 50px;
  background-color: rgb(16, 16, 16);
}
</style>
