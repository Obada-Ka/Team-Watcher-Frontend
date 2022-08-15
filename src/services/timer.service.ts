import { AppConfig } from "@/config/AppConfig";
import api from "../config/api";
export default class TimerService {
  startTimer() {
    return api.post(AppConfig.endPoints.startTimer).then((response) => {
      return response.data;
    });
  }
  stopTimer(timerId: any) {
    return api
      .post(AppConfig.endPoints.stopTimer + "/" + timerId)
      .then((response) => {
        return response;
      });
  }
  getTimers() {
    return api.get(AppConfig.endPoints.getTimers).then((response) => {
      return response;
    });
  }
  convertToTimer(value: any) {
    return new Date(value * 1000).toISOString().substring(11, 19);
  }
}
