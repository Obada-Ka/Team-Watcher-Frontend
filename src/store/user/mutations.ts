export default {
  getUsers(state: any, payload: any) {
    state.usersData = payload.data;
  },
  setUserData(state: any, payload: any) {
    state.userData = payload.user;
  },
  getUsersStatus(state: any, payload: any) {
    state.usersStatus = payload.data;
  },
  logoutUser(state: any) {
    state.userData = null;
  },
  setTimer(state: any, payload: any) {
    state.timerId = payload.timerId;
    state.currentTimer = payload.value;
  },
  setTimers(state: any, payload: any) {
    state.timersData = payload.data;
  },
  setRole(state: any, payload: any) {
    state.userRoles.push(payload.data);
  },
  removeRole(state: any, payload: any) {
    state.userRoles.splice(payload.data - 1, 1);
  },
  stopTimer(state: any) {
    state.timerId = null;
    state.currentTimer = 0;
  },
};
