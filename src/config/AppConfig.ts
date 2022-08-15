const api_url = process.env.VUE_APP_ROOT_API;
export const AppConfig = {
  endPoints: {
    signup: `${api_url}/register`,
    login: `${api_url}/login`,
    logout: `${api_url}/logout`,
    startTimer: `${api_url}/startTimer`,
    stopTimer: `${api_url}/stopTimer`,
    getTimers: `${api_url}/getAllDayTimer`,
    getAllUsers: `${api_url}/getAllUsers`,
    getOnlineUsers: `${api_url}/getStatus`,
    assignRole: `${api_url}/assignRole`,
    removeRole: `${api_url}/deleteAssignRole`,
  },
};
