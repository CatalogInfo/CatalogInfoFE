<template>
    <div class="bg-gray-600 rounded-xl p-6 m-4">
        <TreeItem v-for="item in items" :key="item.id" :item=item @goToGategoryView="goToGategoryView">
            
        </TreeItem>
    </div>
</template>
<script setup lang="ts">
import Category from "@/models/category";
import TreeItem from "./TreeItem.vue";
import { useRouter } from 'vue-router'
import { Collection } from "pinia-orm";
import { PropType } from "vue";

const router = useRouter();
const goToGategoryView = (item: Category) => {
  router.push('/categories/' + item.id.toString())
}

defineProps({
   items: {
    type: Object as PropType<Collection<Category>>,
    required: true
   } 
});
</script>
