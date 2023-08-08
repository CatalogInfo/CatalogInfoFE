<template>
  <div class="flex flex-col">
  <div class="relative flex flex-row w-full">
    <Button
      id="itemBut"
      class="text-center h-24 w-96 bg-black rounded-lg p-8 shadow-xl font-bold text-xl"
      @click="$emit('goToGategoryView')"
    >
     <p class="text-white text-left text-xl grow">{{ item.name.toUpperCase() }}</p>
    </Button>
    <Dropdown class="w-36">
      <div class="">
        <div class="relative flex space-x-2">
          <DropdownItem class="" @click="deleteItem()">
            <i class="pi pi-trash"></i>
          </DropdownItem>
          <DropdownItem class="" @click="doToggle()">
            <i class="pi pi-plus"></i>
          </DropdownItem>
        </div>
      </div>
    </Dropdown>
  </div>
  <div class="ml-16 mt-3">
    <AddItem
      @doToggle="doToggle()"
      @submit="submit()"
      :toggle="toggle"
      :valueString="categoryString"
      :wrongInputPlaceholder="'empty input'"
      :placeholder="'type name...'"
      v-if="toggle">
    </AddItem>
    <CategoryItem
     v-for="cat in item.children"
     :key="cat.id"
    :item="cat"
    >

    </CategoryItem>
  </div>
  </div>
</template>

<script setup lang="ts">
import Category from '../../models/category'
import Button from 'primevue/button'
import DropdownItem from '@/components/menu/DropdownItem.vue';
import CategoryItem from "@/components/items/CategoryItem.vue"
import Dropdown from '@/components/menu/Dropdown.vue';
import CategoryManager from '@/managers/category_manager';
import CategoryRequest from '@/dtos/requests/category_request';
import BufferManager from '@/managers/buffer_manager';
import AddItem from '../input/AddItem.vue';
import { ref } from 'vue';

const props = defineProps({
  item: {
    type: Category,
    required: true
  }
})

const toggle = ref(false)
const categoryString = ref('')

const doToggle = () => {
  toggle.value = !toggle.value
}

const submit = async () => {
  const categoryRequest: CategoryRequest = { name: BufferManager.get()?.value as string }
  await CategoryManager.createCategory(categoryRequest)

  if (BufferManager.get()?.value != '') {
    doToggle()
    categoryString.value = ''
  }
}

defineEmits(['goToGategoryView'])

const deleteItem = async () => {
   await CategoryManager.deleteCategory(props.item.id);
}
</script>
<style scoped>
#itemBut {
  background-color: rgb(16, 16, 16);
  border: 2px solid #822e75;
  color: rgb(179, 179, 179);
  box-shadow: 0px 0px 4px 4px rgba(190, 52, 203, 0.3);
}

#itemBut:hover {
  background-color: black;
  color: rgb(179, 179, 179);
  box-shadow: 0px 0px 4px 4px #822e75;
}

</style>
