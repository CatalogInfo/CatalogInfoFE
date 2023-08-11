<template>
  <div class="bg-gray-600 rounded-xl p-6 m-4">
    <CreatingInput
      @doToggle="$emit('doToggle')"
      @submit="submit()"
      :toggle="toggle"
      :valueString="categoryString"
      :wrongInputPlaceholder="'empty input'"
      :placeholder="'type name...'"
      class="ml-6"
      v-if="toggle"
     />   
    <TreeItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      @goToGategoryView="goToGategoryView"
    />
  </div>
</template>
<script setup lang="ts">
import Category from '@/models/category'
import TreeItem from './TreeItem.vue'
import { useRouter } from 'vue-router'
import { Collection } from 'pinia-orm'
import { PropType } from 'vue'
import CreatingInput from '@/components/input/CreatingInput.vue'
import CategoryUtils from '@/utils/category_utils'

const router = useRouter()
const goToGategoryView = (item: Category) => {
  router.push('/categories/' + item.id)
}

const emit = defineEmits(['doToggle'])

const props = defineProps({
  items: {
    type: Object as PropType<Collection<Category>>,
    required: true
  },
  toggle: {
    type: Boolean,
    required: true
  },
  categoryString: {
    type: String,
    required: true
  }
})

const doToggleCallback = () => {
  emit('doToggle')
}

const submit = async () => {
  await CategoryUtils.createCategory(doToggleCallback, props.categoryString, null)
}
</script>
