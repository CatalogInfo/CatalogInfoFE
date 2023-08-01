<template>
  <div class="mt-5 flex w-full flex-row justify-center">
    <SubmitButton class="p-3" @click="tryLogout">Logout</SubmitButton>
  </div>
</template>

<script setup>
import AuthManager from "@/managers/auth_manager";
import SubmitButton from "@/components/common/SubmitButton.vue";

const tryLogout = 
   () => {
    AuthManager.logout();
  };
</script>
