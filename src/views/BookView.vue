<template>
  <div class="relative flex flex-row">

    <div class="w-1/3">
      <NoteItem v-for="note in notes" :id="note.id" :key="note.id" :offsetTop="note.top" />
    </div>
    <div @contextmenu.prevent="onImageRightClick" class="justify-center w-full mt-10 bg-[#1e1e1e] p-4 rounded-xl">
      <ContextMenu ref="menu" :model="items" />

      <div id="page-view" @mouseup="textSelection()" class="text-left" v-html="getText()"></div>
    </div>
    <div class="w-1/3">
      <PrescriprionInput v-if="showPresriptionInput" v-model:input="input" :offsetTop="offsetTop" @cancel="cancel()" @save="save()"></PrescriprionInput>

    </div>

  </div>
</template>
<script setup lang="ts">
import BookManager from '@/managers/book_manager'
import Book from '@/models/book'
import ContextMenu from 'primevue/contextmenu';
import PrescriprionInput from '@/components/input/PrescriprionInput.vue';
import NoteItem from "@/components/items/NoteItem.vue";
import { computed, ref } from 'vue';
import NoteManager, {NoteType} from '@/managers/note_manager';
import NoteUtils from '@/utils/note_utils';

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  bookId: {
    type: Number,
    required: true
  }
})

const rangeBuffer = ref()
const input = ref("");
const selectedText = ref("");
const offsetTop = ref("");
const showPresriptionInput = ref(false);
const note = ref<NoteType>();
const notes = ref(computed(() => NoteManager.all()));

const cancel = () => {
  showPresriptionInput.value = false;
}

const save = () => {
  showPresriptionInput.value = false;
  NoteManager.saveNote(<NoteType>note.value);
}

const menu = ref();
const items = ref([
    { 
      label: 'make prescription', icon: 'pi pi-pencil',      
      command: () => {
        const markerEl = NoteUtils.createSpanToSurroundText();
        rangeBuffer.value.surroundContents(markerEl);
        offsetTop.value = String(markerEl.offsetTop + "px");
        note.value = { id: markerEl.id, note: input.value, topOffset: offsetTop.value };
        showPresriptionInput.value = true;
    } 
  },
]);

const onImageRightClick = (event: Event) => {
    menu.value.show(event);
};

const textSelection = () => {
  const range = NoteUtils.getSelectedRange();
  rangeBuffer.value = range;
};

const getText = () => {
  const book: Book = <Book>BookManager.getBookById(props.bookId)
  return book.text
}
</script>

