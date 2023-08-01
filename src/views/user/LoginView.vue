<template>
  <div class="relative flex h-full flex-col items-center justify-center">
    <AuthForm>
      <InputField
        v-model="credentials.username"
        type="text"
        placeholder="Username"
      />
      <InputField
        v-model="credentials.password"
        type="password"
        placeholder="Password"
      />
      <SubmitButton @click="tryLogin"> Login </SubmitButton>
      <template #footer>
        <InternalLink path="#forgot"> Forgot password? </InternalLink>
        <span class="text-gray-600">
          No account?
          <InternalLink path="/auth/register"> Register </InternalLink>
        </span>
      </template>
    </AuthForm>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import InputField from "@/components/common/InputField.vue";
import InternalLink from "@/components/common/InternalLink.vue";
import SubmitButton from "@/components/common/SubmitButton.vue";
import AuthForm from "@/components/auth/AuthForm.vue";
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
