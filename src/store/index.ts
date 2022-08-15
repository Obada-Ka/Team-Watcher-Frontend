import { createStore } from "vuex";
import authModule from "../store/auth/index";
import userModule from "../store/user/index";

export default createStore({
  modules: {
    auth: authModule,
    user: userModule,
  },
});
