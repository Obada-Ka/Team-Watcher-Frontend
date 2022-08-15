<template>
  <base-dialog :show="isLoading" title="Authenticating..." fixed>
    <base-spinner></base-spinner>
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
  <base-dialog
    :show="!formIsValid"
    title="An error occurred"
    @close="handleFormError"
  >
    <p>
      The password must be at least 6 characters or the email is in a wrong
      format!
    </p>
  </base-dialog>
  <form @submit.prevent="login">
    <label for="chk" aria-hidden="true">Login</label>
    <input
      type="text"
      name="email-username"
      placeholder="Email / User name"
      v-model.trim="loginEmailUserName"
      required=""
    />
    <input
      type="password"
      name="pswd"
      placeholder="Password"
      v-model.trim="password"
      required=""
    />
    <button>Login</button>
  </form>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ErrorService from "@/services/error.service";
const errorService = new ErrorService();
export default defineComponent({
  name: "logIn",
  data() {
    return {
      loginEmailUserName: "",
      password: "",
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
    async login() {
      this.formIsValid = true;
      if (this.password.length < 6) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      const actionPayload = {
        login: this.loginEmailUserName,
        password: this.password,
      };

      try {
        await this.$store.dispatch("auth/login", actionPayload);
        this.$router.replace({ name: "UserActions" });
      } catch (err: any) {
        this.isLoading = false;
        (this.error as any) = errorService.handleMsgsError(err);
      }

      this.isLoading = false;
    },
    checkEmailUsername() {
      /* eslint-disable */
      if (/\@/.test(this.loginEmailUserName)) {
        // Validate email address
        if (
          /* eslint-disable */
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            this.loginEmailUserName
          )
        ) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    handleMsgsError(errors: any) {
      let errorMsgs = {};
      const errorKeys = Object.keys(errors);
      errorKeys.forEach((erKey: any) => {
        const msg = {
          [erKey]: (errors[erKey] as any).toString(),
        };
        errorMsgs = Object.assign(errorMsgs, msg);
      });
      return errorMsgs;
    },
    handleError() {
      this.error = {};
    },
    handleFormError() {
      this.formIsValid = true;
    },
  },
});
</script>
<style></style>
