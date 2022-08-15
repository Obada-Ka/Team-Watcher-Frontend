import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      user: null,
      token: null,
      tokenExpiration: null,
      didAutoLogout: false,
    };
  },
  mutations,
  actions,
  getters,
};
