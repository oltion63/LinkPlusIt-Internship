import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    users: [],
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        addUser: (state, action) => {
            state.users.unshift(action.payload);
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(u => u.id === action.payload.id);
            if (index !== -1) state.users[index] = action.payload;
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(u => u.id !== action.payload);
        },
        sortUsers: (state, action) => {
            state.users.sort((a,b) =>
                action.payload === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name)
            );
        },
    }
});

export const { setUsers, addUser, updateUser, deleteUser, sortUsers } = usersSlice.actions;
export default usersSlice.reducer;

