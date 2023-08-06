<template>
    <div class="flex items-center justify-center bg-[#822e75] rounded-full w-8 h-8 hover:bg-[#672f5f]" @click="$emit('action')">
        <slot />
    </div>
</template>
<script setup lang="ts">
defineEmits(['action'])

</script>