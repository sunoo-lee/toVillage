import axios from "axios";
import { create } from "zustand";

interface UserInfoStore {
  signInState: boolean;
  loginHandler: (userInfo: UserInfo) => void;
  resistNewUesr: (userInfo: UserInfo) => void;
}
interface UserInfo {
  email: string;
  pwd: string;
}

const userInfoStore = create<UserInfoStore>((set, get) => ({
  signInState: false,
  loginHandler: async (userInfo: UserInfo) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        userInfo
      );
      const { access_token } = await response.data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      localStorage.setItem("access_token", access_token);
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
