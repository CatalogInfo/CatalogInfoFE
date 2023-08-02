<template>
  <div class="relative flex h-full flex-col items-center justify-center">
      <MyInputText
        v-model="credentials.username"
        type="text"
        placeholder="Username"
      />
      <MyInputText
        v-model="credentials.password"
        type="password"
        placeholder="Password"
      />
      <MyButton @click="tryLogin" :text="'login'"></MyButton>
        <span class="text-gray-600">
          No account?
          <a href="/auth/register"> Register </a>
        </span>
      
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import MyInputText from "../../components/input/MyInputText.vue"
import MyButton from "../../components/buttons/MyButton.vue";
import AuthManager from "@/managers/auth_manager";
import { useRouter } from "vue-router";

const router = useRouter();

const credentials = reactive({
  username: "",
  password: "",
});

const tryLogin = 
  async () => {
    await AuthManager.login(credentials.username, credentials.password);

    router.push("/");
  };
</script>
