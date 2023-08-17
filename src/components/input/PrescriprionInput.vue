<template>
<div id="inp" class="relative flex flex-col w-36 h-24 justify-center rounded-xl">
  <InputText placeholder="type here.." type="text" class="rounded-xl" v-model="inputRef" />
  <div class="flex flex-row space-x-4 justify-center">
    <Button rounded @click="cancel()" icon="pi pi-times"></Button>
    <Button rounded @click="save()" icon="pi pi-check"></Button>
  </div>
</div>

</template>
<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref } from 'vue';

const props = defineProps({
    offsetTop: {
        type: String,
        required: true,
    },
    input: {
        type: String,
        required: true,
    }
})
const emit = defineEmits(['cancel', 'update:input']);

const inputRef = ref("");
const top = ref<string>(props.offsetTop);

const cancel = () => {
    inputRef.value = '';
    emit('cancel')
}

const save = () => {
    emit('update:input', inputRef.value);
}

</script>
<style scoped>
#inp {
  top: v-bind('top');
}

</style>

