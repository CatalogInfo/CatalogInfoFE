<template>
    <div class="w-full">
      <div class="ml-6">
        <div 
          class="flex flex-row justify-between bg-blue-sky-900 hover:bg-sky-700 hover:rounded-xl p-2 space-x-2 items-center"
          @click.self="go(item)"
        >
        <div class="flex flex-row items-center">
          <button :disabled="!hasChildren" class="w-10 h-10 bg-transparent rounded-full"  @click="toggleSubView()">
            <i v-if="hasChildren" :class="icon"></i>
          </button>
          <p class="text-white">{{ item.name.toUpperCase() }}</p>
        </div>
        <div>
          <button class="w-10 h-10 bg-transparent rounded-full self-end"  @click="deleteItem()">
            <i class="pi pi-trash"></i>
          </button>
          <button class="w-10 h-10 bg-transparent rounded-full self-end"  @click="doToggle()">
            <i class="pi pi-plus"></i>
          </button>
        </div>
        </div>
        <AddItem
          @doToggle="doToggle()"
          @submit="submit()"
          :toggle="toggle"
          :valueString="categoryString"
          :wrongInputPlaceholder="'empty input'"
          :placeholder="'type name...'"
          class="ml-6 mt-2"
          v-if="toggle">
        </AddItem>
        <TreeItem
          v-for="category in item.children"
          :key="category.id"
          :item="category"
          @goToGategoryView="go"
          v-if="show"
        >
        </TreeItem>
      </div>
    </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import TreeItem from "@/components/items/TreeItem.vue";
import Category from '@/models/category';
import { computed, PropType, ref } from "vue";
import CategoryManager from '@/managers/category_manager';
import BufferManager from '@/managers/buffer_manager';
import CategoryRequest from '@/dtos/requests/category_request';
import AddItem from '@/components/input/AddItem.vue';

const props = defineProps({
    item: {
      type: Object as PropType<Category>,
      required: true
    }
})
const emit = defineEmits(['goToGategoryView'])

const icon = ref("pi pi-angle-right");
const hasChildren = ref(computed(() => props.item.hasChildren));
const show = ref(false);
const toggle = ref(false)
const categoryString = ref('')

const doToggle = () => {
  toggle.value = !toggle.value
}

const submit = async () => {
  const categoryRequest: CategoryRequest = { name: BufferManager.get()?.value as string }
  
  let parent = props.item.id;

  await CategoryManager.createCategory(categoryRequest, parent)

  if (BufferManager.get()?.value != '') {
    doToggle()
    categoryString.value = ''
  }
}
const deleteItem = async () => {
    await CategoryManager.deleteCategory(props.item.id);
}

const toggleSubView = () => {
    console.log(props.item.children);
    if(show.value) {
      icon.value = "pi pi-angle-right";
    } else {
      icon.value = "pi pi-angle-down";
    }
    show.value = !show.value;
}

const go = (it: Object) => {
  emit('goToGategoryView', it);
}
</script>
