import { create } from "zustand";

interface UserInfoStore {
  signInState: boolean;
  setUserState: () => void;
}

const userInfoStore = create<UserInfoStore>((set, get) => ({
  signInState: false,
  setUserState: () => {
    const state = get().signInState;
    if (state) {
      set((state) => ({ signInState: false }));
    } else {
      set((state) => ({ signInState: true }));
    }
  },
}));

export default userInfoStore;
