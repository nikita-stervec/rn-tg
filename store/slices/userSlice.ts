import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string | null;
  tag: string | null;
  email: string | null;
  name?: string;
  avatar?: string;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    setName(state, action: PayloadAction<User["name"]>) {
      if (state.user) {
        state.user.name = action.payload;
      }
    },
    setTag(state, action: PayloadAction<User["tag"]>) {
      if (state.user) {
        state.user.tag = action.payload;
      }
    },
  },
});

export default userSlice.reducer;
export const { setUser, clearUser, setName, setTag } = userSlice.actions;
