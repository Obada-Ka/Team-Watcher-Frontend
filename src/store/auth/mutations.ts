export default {
  setUser(state: any, payload: any) {
    state.token = payload.token;
    state.user = payload.user;
  },
  removeUser(state: any, payload: any) {
    state.token = null;
    state.user = null;
  },
  setAutoLogout(state: any) {
    state.didAutoLogout = true;
  },
};
