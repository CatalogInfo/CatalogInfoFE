<template>
  <div class="relative flex flex-row w-full">
  <Button
    id="itemBut"
    class="text-center h-24 w-full bg-black rounded-lg p-8 shadow-xl font-bold text-3xl"
    @click="$emit('goToGategoryView')"
  >
    <p class="text-white text-left text-xl grow">{{ item.name.toUpperCase() }}</p>
  </Button>
  <Dropdown class="w-full">
    <div class="">
      <div class="relative flex space-x-2">
      <DropdownItem class="" @click="deleteItem()">
        <i class="pi pi-trash"></i>
      </DropdownItem>
      <DropdownItem class="">
        <i class="pi pi-plus"></i>
      </DropdownItem>
      </div>
      </div>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import Category from '../../models/category'
import Button from 'primevue/button'
import DropdownItem from '@/components/menu/DropdownItem.vue';
import Dropdown from '@/components/menu/Dropdown.vue';
import CategoryManager from '@/managers/category_manager';

const props = defineProps({
  item: {
    type: Category,
    required: true
  }
})

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
