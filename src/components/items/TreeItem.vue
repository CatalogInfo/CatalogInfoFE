<template>
  <div class="w-full">
    <div class="ml-6">
      <TreeDisplay
        :icon="icon"
        :item="item"
        @doToggle="doToggle()"
        @toggleSubView="toggleSubView()"
        @click.self="go(item)"
      />
      <CreatingInput
        @doToggle="doToggle()"
        @submit="submit()"
        :toggle="toggle"
        :valueString="categoryString"
        :wrongInputPlaceholder="'empty input'"
        :placeholder="'type name...'"
        class="ml-6 mt-2"
        v-if="toggle"
      />
      <TreeItem
        v-for="category in item.children"
        :key="category.id"
        :item="category"
        @goToGategoryView="go"
        v-show="show"
      >
      </TreeItem>
    </div>
  </div>
</template>
<script setup lang="ts">
import TreeItem from '@/components/items/TreeItem.vue'
import Category from '@/models/category'
import { PropType, ref } from 'vue'
import CreatingInput from '@/components/input/CreatingInput.vue'
import TreeDisplay from './TreeDisplay.vue'
import CategoryUtils from '@/utils/category_utils'

const props = defineProps({
  item: {
    type: Object as PropType<Category>,
    required: true
  }
})
const emit = defineEmits(['goToGategoryView'])

const icon = ref('pi pi-angle-right')
const show = ref(false)
const toggle = ref(false)
const categoryString = ref('')

const doToggle = () => {
  toggle.value = !toggle.value
}

const submit = async () => {
  await CategoryUtils.createCategory(doToggle, categoryString.value, props.item.id)
}

const toggleSubView = () => {
  if (show.value) {
    icon.value = 'pi pi-angle-right'
  } else {
    icon.value = 'pi pi-angle-down'
  }

  show.value = !show.value
}

const go = (it: Object) => {
  emit('goToGategoryView', it)
}
</script>
