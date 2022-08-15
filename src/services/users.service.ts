import { AppConfig } from "@/config/AppConfig";
import api from "../config/api";
export default class UsersService {
  getAllUsers() {
    return api.get(AppConfig.endPoints.getAllUsers).then((response) => {
      return response.data;
    });
  }
  getOnlineUsers() {
    return api.get(AppConfig.endPoints.getOnlineUsers).then((response) => {
      return response.data;
    });
  }
  assignUserRole(userId: any, newRoleId: any) {
    return api
      .post(AppConfig.endPoints.assignRole + "/" + userId + "/" + newRoleId)
      .then((response) => {
        return response.data;
      });
  }
  removeUserRole(userId: any, roleId: any) {
    return api
      .post(AppConfig.endPoints.removeRole + "/" + userId + "/" + roleId)
      .then((response) => {
        return response.data;
      });
  }
}
