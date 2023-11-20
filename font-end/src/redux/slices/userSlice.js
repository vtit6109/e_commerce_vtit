import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_HOST}/${import.meta.env.VITE_USER_API}`,
});

export const loginWithEmail = createAsyncThunk(
  'user/loginWithEmail',
  async ({ useremail, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/loginWithEmail', {
        useremail,
        password,
      });
      const user = response.data;
      if (!user) {
        throw new Error('Thông tin đăng nhập không chính xác.');
      }
      sessionStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const checkPhoneNumber = createAsyncThunk(
  'user/checkPhoneNumber',
  async ({ phonenumber }, { rejectWithValue }) => {
    try {
      const response = await api.post('/checkPhoneNumber', { phonenumber });
      const userExists = response.data;
      if (!userExists) {
        throw new Error('Số điện thoại không tồn tại.');
      }
      return userExists;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const verifyCode = createAsyncThunk(
  'user/verifyCode',
  async ({ phonenumber, code }, { rejectWithValue }) => {
    try {
      const response = await api.post('/verifyCode', { phonenumber, code });
      const user = response.data;
      if (!user) {
        throw new Error('Mã xác thực không chính xác.');
      }
      sessionStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ useremail, password, phonenumber }, { rejectWithValue }) => {
    try {
      const response = await api.post('/register', {
        useremail,
        password,
        phonenumber,
      });
      const user = response.data;
      if (!user) {
        throw new Error('Đăng ký không thành công.');
      }
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateUserOnServer = createAsyncThunk(
  'user/updateUserOnServer',
  async (updatedUser, thunkAPI) => {
    try {
      const response = await api.patch(`/${updatedUser._id}`, updatedUser);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const addAddressOnServer = createAsyncThunk(
  'user/addAddressOnServer',
  async ({ userId, address }, thunkAPI) => {
    try {
      const response = await api.post(`/${userId}/address`, address);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const deleteAddressOnServer = createAsyncThunk(
  'user/deleteAddressOnServer',
  async ({ userId, addressId }) => {
    const response = await api.delete(`/${userId}/deleteaddress/${addressId}`);
    return response.data;
  },
);
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      sessionStorage.removeItem('user');
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    //registerUser------
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    });
    //loginWithEmail------
    builder.addCase(loginWithEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginWithEmail.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginWithEmail.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    });
    //checkPhoneNumber------
    builder.addCase(checkPhoneNumber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkPhoneNumber.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(checkPhoneNumber.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    });
    //verifyCode------
    builder.addCase(verifyCode.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyCode.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(verifyCode.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    });
    //updateUserOnServer------
    builder.addCase(updateUserOnServer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserOnServer.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      sessionStorage.setItem('user', JSON.stringify(action.payload));
    });
    builder.addCase(updateUserOnServer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //addAddressOnServer------
    builder.addCase(addAddressOnServer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addAddressOnServer.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      sessionStorage.setItem('user', JSON.stringify(action.payload));
    });
    builder.addCase(addAddressOnServer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //deleteAddressOnServer------
    builder.addCase(deleteAddressOnServer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAddressOnServer.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteAddressOnServer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logoutUser } = userSlice.actions;
export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
