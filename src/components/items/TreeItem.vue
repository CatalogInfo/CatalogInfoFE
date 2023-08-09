<template>
    <div class="w-full">
      <div class="ml-4">
        <div 
          class="flex flex-row bg-blue-sky-900 hover:bg-sky-700 hover:rounded-xl p-2 space-x-2 items-center"
          @click.self="go(item)"
        >
          <button :disabled="!hasChildren" class="w-10 h-10 bg-transparent rounded-full"  @click="toggle()">
            <i v-show="hasChildren" :class="icon"></i>
          </button>
          <p class="text-white">{{ item.name.toUpperCase() }}</p>
        </div>
        <TreeItem
          v-show="show"
          v-for="category in item.children"
          :key="category.id"
          :item="category"
          @goToGategoryView="go"
        >
        </TreeItem>
      </div>
    </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import TreeItem from "@/components/items/TreeItem.vue";
import Category from '@/models/category';
import { PropType, ref } from "vue";

const props = defineProps({
    item: {
      type: Object as PropType<Category>,
      required: true
    }
})
const emit = defineEmits(['goToGategoryView'])

const go = (it: Object) => {
  emit('goToGategoryView', it);
}

const icon = ref("pi pi-angle-right");
const hasChildren = ref<boolean>(props.item.hasChildren);
const show = ref(false);

const toggle = () => {
    if(show.value) {
      icon.value = "pi pi-angle-right";
    } else {
      icon.value = "pi pi-angle-down";
    }
    show.value = !show.value;
}
</script>
