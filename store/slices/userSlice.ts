import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  tag: string;
  id: string;
  email: string;
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
  },
});

export default userSlice.reducer;
export const { setUser, clearUser, setName } = userSlice.actions;
