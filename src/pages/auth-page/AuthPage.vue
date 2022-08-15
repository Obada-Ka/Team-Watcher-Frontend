<template>
  <div class="main">
    <div class="auth-container">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div class="login">
        <Login />
      </div>

      <div class="signup">
        <Signup />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TokenService from "../../services/token.service";
import Login from "../../components/auth/Login.vue";
import Signup from "../../components/auth/SignUp.vue";

const tokeService = TokenService;
export default defineComponent({
  components: {
    Login,
    Signup,
  },
  /* beforeMount() {
    const tokenIsExist = tokeService.getLocalAccessToken();
    if (tokenIsExist) {
      this.$router.replace({ name: "MainPage" });
      return;
    }
    this.$router.replace({ name: "AuthPage" });
  }, */
});
</script>
<style>
.main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.auth-container {
  width: 400px;
  height: 500px;
  background: #2f2a5f;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;
}
#chk {
  display: none;
}
.login {
  position: relative;
  width: 100%;
  height: 100%;
}
label {
  color: #fff;
  font-size: 2em;
  justify-content: center;
  display: flex;
  margin: 60px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
input {
  width: 60%;
  height: 40px;
  background: #e0dede;
  justify-content: center;
  display: flex;
  margin: 15px auto;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
}
button {
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #573b8a;
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;
}
button:hover {
  background: #6d44b8;
}

.signup {
  height: 460px;
  background: #eee;
  border-radius: 60% / 10%;
  transform: translateY(-180px);
  transition: 0.8s ease-in-out;
}
.signup label {
  color: #573b8a;
  transform: scale(0.6);
}

#chk:checked ~ .signup {
  transform: translateY(-514px);
}
#chk:checked ~ .signup label {
  transform: scale(1);
}
#chk:checked ~ .signup label {
  transform: scale(0.6);
}
</style>
