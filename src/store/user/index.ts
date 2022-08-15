import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      userData: null,
      usersData: null,
      userRoles: [],
      timerId: null,
      currentTimer: null,
      timersData: null,
    };
  },
  mutations,
  actions,
  getters,
};
