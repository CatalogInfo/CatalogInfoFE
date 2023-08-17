<template>
<div class="relative flex flex-col ease-out duration-200 border-2 rounded-lg p-8 m-3" :class="{ [`ease-in duration-1000 bg-slate-800`]: zoom }">
    {{ text }}
</div>
</template>
<script setup lang="ts">
import { PropType, ref, toRef } from 'vue';
import {NoteType} from '@/managers/note_manager';

const props = defineProps({
    note: {
        type: Object as PropType<NoteType>,
        required: true,
    },
    toZoom: {
        type: Boolean,
        required: true,
    }
})

const zoom = toRef(props, 'toZoom')

const text = ref(props.note.note);
</script>
<style scoped>
</style>

      