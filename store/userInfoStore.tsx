import axios from "axios";
import { create } from "zustand";

interface UserInfoStore {
  signInState: boolean;
  autoLogin: boolean;
  loginHandler: (userInfo: UserInfo, autoLogin: boolean) => void;
  resistNewUesr: (userInfo: UserInfo) => void;
}
interface UserInfo {
  email: string;
  pwd: string;
}

const userInfoStore = create<UserInfoStore>((set, get) => ({
  signInState: false,
  autoLogin: false,
  loginHandler: async (userInfo: UserInfo, autoLogin: boolean = false) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        userInfo
      );
      const { access_token } = await response.data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      if (autoLogin) {
        localStorage.setItem("access_token", access_token);
      } else {
        sessionStorage.setItem("access_token", access_token);
      }
    } catch (error: any) {
      alert(error.message);
    }
  },
  resistNewUesr: async (userInfo: UserInfo) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        userInfo
      );
      const data = await response.data;
      console.log(data);
    } catch (error: any) {
      console.log(error.message);
    }
  },
}));

export default userInfoStore;
