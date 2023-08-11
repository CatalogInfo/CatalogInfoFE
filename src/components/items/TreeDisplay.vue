<template>
  <div
    class="flex flex-row justify-between bg-blue-sky-900 hover:bg-sky-700 hover:rounded-xl p-2 space-x-2 items-center"
  >
    <div class="flex flex-row items-center">
      <CategoryToggleChildrenButton
        :hasChildren="hasChildren"
        :icon="icon"
        @action="$emit('toggleSubView')"
      />
      <p class="text-white">{{ item.name.toUpperCase() }}</p>
    </div>
    <div>
      <CategoryButton :icon="'pi pi-trash'" @action="deleteItem()" />
      <CategoryButton :icon="'pi pi-plus'" @action="$emit('doToggle')" />
    </div>
  </div>
</template>
<script setup lang="ts">
import CategoryManager from '@/managers/category_manager'
import Category from '@/models/category'
import CategoryButton from '../buttons/CategoryButton.vue'
import CategoryToggleChildrenButton from '../buttons/CategoryToggleChildrenButton.vue'
import { computed, PropType, ref } from 'vue'

const props = defineProps({
  item: {
    type: Object as PropType<Category>,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})

defineEmits(['toggleSubView', 'doToggle'])
const hasChildren = ref(computed(() => props.item.hasChildren))

const deleteItem = async () => {
  await CategoryManager.deleteCategory(props.item.id)
}
</script>
