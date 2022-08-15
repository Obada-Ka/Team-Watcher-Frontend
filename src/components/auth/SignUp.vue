<template>
  <base-dialog :show="isLoading" title="Authenticating..." fixed>
    <base-spinner></base-spinner>
  </base-dialog>
  <base-dialog
    :show="!formIsValid"
    title="Form not valid!"
    @close="handleFormValidation"
  >
    <p>
      The password must be at least 6 characters or the email is in a wrong
      format!
    </p>
  </base-dialog>
  <base-dialog
    :show="errorsExist.length > 0"
    title="An error occurred"
    @close="handleError"
  >
    <p v-for="(key, value) in error" :key="key">
      {{ value + ": " + key }}
    </p>
  </base-dialog>
  <form @submit.prevent="signup">
    <label for="chk" aria-hidden="true">Sign up</label>
    <input
      type="text"
      name="txt"
      placeholder="User name"
      v-model.trim="username"
      required=""
    />
    <input
      type="email"
      name="email"
      v-model.trim="email"
      placeholder="Email"
      required=""
    />
    <input
      type="password"
      name="pswd"
      v-model.trim="password"
      placeholder="Password"
      required=""
    />
    <input
      type="password"
      name="pswd-confir"
      v-model.trim="passwordConfirmation"
      placeholder="Re-type Password"
      required=""
    />

    <button>Sign up</button>
  </form>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ErrorService from "@/services/error.service";
const errorService = new ErrorService();
export default defineComponent({
  data() {
    return {
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
      formIsValid: true,
      mode: "signup",
      isLoading: false,
      error: {},
    };
  },
  computed: {
    errorsExist() {
      const keys: any = Object.keys(this.error);
      return keys;
    },
  },
  methods: {
    async signup() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6 ||
        this.password != this.passwordConfirmation
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;
      const actionPayload = {
        name: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };

      try {
        await this.$store.dispatch("auth/signup", actionPayload);
        this.$router.replace({ name: "MainPage" });
      } catch (err: any) {
        this.isLoading = false;
        (this.error as any) = errorService.handleMsgsError(err);
      }

      this.isLoading = false;
    },
    handleError() {
      this.error = {};
    },
    handleFormValidation() {
      this.formIsValid = true;
    },
  },
});
</script>
<style></style>
