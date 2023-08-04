<script setup lang="ts"></script>

<template>
  <Suspense>
    <div class="h-full w-full">
      <Toast position="bottom-right" />
      <router-view />
    </div>
  </Suspense>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
