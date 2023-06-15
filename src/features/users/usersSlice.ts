import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/User";

interface UserState {
  users: User[] | null;
  singleUser: User | null;
  loading: boolean;
  errors: any;
}

const initialState: UserState = {
  users: [],
  singleUser: null,
  loading: false,
  errors: null,
};

const headers = { Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}` };

// createAsyncThunk
// The word "thunk" is a programming term that means "a piece of code that does some delayed work"
// For Redux specifically, "thunks" are a pattern of writing functions with logic inside
// that can interact with a Redux store's dispatch and getState methods.
// A function that accepts a Redux action type string and a callback function that should return a promise.

// Actions are processes that get data from backend
export const getUsers = createAsyncThunk<User[]>(
  "users/getUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users`,
        { headers }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserById = createAsyncThunk<User, string>(
  "users/getUserById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        { headers }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk<User, Object | any>(
  "users/updateUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${data.id}`,
        data,
        { headers }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// createSlice
// A function that accepts an initial state, an object of reducer functions,
// and a "slice name", and automatically generates action creators and action types
// that correspond to the reducers and state.
// In Redux-Toolkit, the createSlice method helps us create a slice of the redux-store.
// This function aims to reduce the boilerplate required to add data to redux in the canonical way.
// Internally, it uses createAction and createReducer.

// In Redux, a reducer is a pure function that takes an action and the
// previous state of the application and returns the new state.
// The action describes what happened and it is the reducer's job
// to return the new state based on that action.

// Reducers -> reduce to a specific state, changes state
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    filterUser: (state, action) => {
      state.users = state.users?.filter((user) => user.id !== action.payload)!;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase(getUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.singleUser = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.singleUser = action.payload;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
export const { setUsers, filterUser } = userSlice.actions;
