<template>
  <div id="inp" class="relative flex flex-col" @mouseenter="selectSpanById()" @mouseleave="diselectSpanById()" @click="$emit('zoom')">
    <div id="note" class="absolute right-2 top-0 rounded-full w-8 h-8 bg-slate-400 flex items-center justify-center hover:bg-slate-300	">
     <i class="pi pi-pencil"></i> 
   </div>
  </div>
</template>
<script setup lang="ts">
import NoteManager from '@/managers/note_manager';
import { ref } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true,
    }
})
defineEmits(['zoom']);

const top = ref(NoteManager.getNoteById(props.id)?.topOffset);

const selectSpanById = () => {
    const textLinkedByNote = <HTMLElement>document.getElementById(props.id);
    textLinkedByNote.style.color = "green"; 
};

const diselectSpanById = () => {
    const textLinkedByNote = <HTMLElement>document.getElementById(props.id);
    textLinkedByNote.style.color = "white"; 
};
</script>
<style scoped>
#inp {
    top: v-bind('top');
}
#note {
    transition: 0.3s ease-out;
}
#note:hover {
  transform: translate(-4px, 0px);
  transition: 0.5s ease;
}

</style>

    