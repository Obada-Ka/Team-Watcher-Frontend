import TimerService from "../../services/timer.service";
const timerService = new TimerService();
import UsersService from "../../services/users.service";
const userService = new UsersService();
export default {
  setUserData(context: any, payload: any) {
    context.commit("setUserData", {
      user: payload.user,
    });
  },
  logoutUser(context: any, payload: any) {
    context.commit("logoutUser", {
      userData: payload.user,
    });
  },
  async setTimer(context: any, payload: any) {
    const response = timerService.startTimer();
    return new Promise((resolve, reject) => {
      response
        .then((res: any) => {
          context.commit("setTimer", {
            timerId: res.data.id,
            value: 0,
          });
          resolve(res);
        })
        .catch((error: any) => {
          reject({
            event: "setTimer",
            error: error.response,
          });
        });
    });
  },
  async stopTimer(context: any, payload: any) {
    const response = timerService.stopTimer(payload);
    return new Promise((resolve, reject) => {
      response
        .then((res: any) => {
          context.commit("stopTimer");
          resolve(res);
        })
        .catch((error: any) => {
          reject({
            event: "stopTimer",
            error: error.response,
          });
        });
    });
  },
  async getTimers(context: any, payload: any) {
    const response = timerService.getTimers();
    return new Promise((resolve, reject) => {
      response
        .then((res: any) => {
          context.commit("setTimers", {
            data: res.data.data,
          });
          resolve(res.data.data);
        })
        .catch((error: any) => {
          reject({
            event: "getTimers",
            error: error.response,
          });
        });
    });
  },
  async getAllUsers(context: any, payload: any) {
    const response = userService.getAllUsers();
    return new Promise((resolve, reject) => {
      response
        .then((res: any) => {
          context.commit("getUsers", {
            data: res.data,
          });
          resolve(res.data);
        })
        .catch((error: any) => {
          reject({
            error: error.response,
          });
        });
    });
  },
  async getUsersStatus(context: any, payload: any) {
    const response = userService.getOnlineUsers();
    return new Promise((resolve, reject) => {
      response
        .then((res: any) => {
          context.commit("getUsersStatus", {
            data: res.data,
          });
          resolve(res.data);
        })
        .catch((error: any) => {
          reject({
            error: error.response,
          });
        });
    });
  },
  async assignUserRole(context: any, payload: any) {
    const response = userService.assignUserRole(
      payload.userId,
      payload.newRoleId
    );
    return new Promise((resolve, reject) => {
      response
        .then((res: any) => {
          context.commit("setRole", {
            data: payload.newRoleId,
          });
          resolve(res.data);
        })
        .catch((error: any) => {
          reject({
            error: error.response,
          });
        });
    });
  },
  async removeUserRole(context: any, payload: any) {
    const response = userService.removeUserRole(payload.userId, payload.roleId);
    return new Promise((resolve, reject) => {
      response
        .then((res: any) => {
          context.commit("removeRole", {
            data: payload.roleId,
          });
          resolve(res.data);
        })
        .catch((error: any) => {
          reject({
            error: error.response,
          });
        });
    });
  },
};
