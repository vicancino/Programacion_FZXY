import { createSlice } from "@reduxjs/toolkit";

interface LoginState {
	value: boolean;
}

const initialState: LoginState = {
	value: false,
};

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		sign_in: (state) => {
			state.value = true;
		},
		sign_out: (state) => {
			state.value = false;
		},
	},
});

export const { sign_in, sign_out } = loginSlice.actions;

export default loginSlice.reducer;
