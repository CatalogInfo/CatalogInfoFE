<template>
  <div class="relative flex h-full flex-col items-center justify-center">
    <AuthForm>
      <InputField
        v-model="credentials.username"
        type="text"
        placeholder="Username"
      />
      <InputField
        v-model="credentials.email"
        type="email"
        placeholder="Email"
      />
      <InputField
        v-model="credentials.password"
        type="password"
        placeholder="Password"
      />
      <InputField
        v-model="credentials.repeatedPassword"
        type="password"
        placeholder="Repeat password"
      />
      <SubmitButton @click="tryRegister"> Register </SubmitButton>
      <template #footer>
        <span class="text-gray-600">
          Already have an account?
          <InternalLink path="/auth/login"> Login </InternalLink>
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
import AuthManager from "@/managers/authManager";
import { showToast } from "@/decorators/toastDecorators";

const credentials = reactive({
  username: "",
  email: "",
  password: "",
  repeatedPassword: "",
});

const tryRegister = showToast(
  { messageOnSuccess: "Registered successfully" },
  async function () {
    if (
      !credentials.password ||
      credentials.password !== credentials.repeatedPassword
    ) {
      throw new Error("Passwords aren't equal");
    }

    await AuthManager.register(
      credentials.username,
      credentials.email,
      credentials.password
    );
  }
);
</script>
