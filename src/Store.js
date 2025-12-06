import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cupons } from "./Cupons";
import axios from "axios";
import apiurl from "./Api";

// ============================================================
// 1. THUNKS / ASYNC ACTIONS
// ============================================================

// ---------- Orders ----------


// Thunk for user registration
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/products/register",
        userData
      );
      return response.data; // backend returns { message: "...", user: {...} }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);



// LOGIN THUNK
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    try {
      const response = await axios.post(
        "/api/v1/products/login",
        credentials
      );
      return response.data;
    } catch (error) {
      return { success: false, message: "Invalid username or password" };
    }
  }
);


// Place Order (POST)
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderDetails) => {
    const response = await apiurl.post(
      "/api/v1/products/orders",
      orderDetails
    );
    return response.data;
  }
);




// Get All Orders (GET)
export const getAllOrders = createAsyncThunk(
  "orders/getAll",
  async () => {
    const response = await apiurl.get(
      "/api/v1/products/orders"
    );
    return response.data.data; // backend -> { data: [...] }
  }
);

// ---------- Veg Products ----------

// Fetch Veg Products (GET)
export const fetchVegProducts = createAsyncThunk(
  "veg/fetchVegProducts",
  async () => {
    const response = await apiurl.get(
      "/api/v1/products/getVeg"
    );
    return response.data;
  }
);


// ============================================================
// 2. SLICES
// ============================================================


export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    success: null,
    user: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      // Success
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message || "User registered successfully!";
        state.user = action.payload.user;
      })

      // Error
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});



/*=========login slice ============*/

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: localStorage.getItem("token") || null,
    user: null,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ==============================================
      // LOGIN PENDING
      // ==============================================
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ==============================================
      // LOGIN SUCCESS
      // ==============================================
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        // ⭐ SAVE TOKEN IN LOCAL STORAGE (Same as your teacher showed)
        localStorage.setItem("token", action.payload.token);

        state.error = null;
      })

      // ==============================================
      // LOGIN FAILED
      // ==============================================
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || "Login Failed";
      });
  },
});
// ---------- Orders Slice (Place Order Status)
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.successMessage = "Order placed successfully!";
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

// ---------- Orders List Slice (GET All Orders)
const getordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [], // MUST be array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ---------- Veg Products Slice
const vegSlice = createSlice({
  name: "veg",
  initialState: {
    vegItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVegProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVegProducts.fulfilled, (state, action) => {
        state.vegItems = action.payload;
      })
      .addCase(fetchVegProducts.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

// ---------- Cupon Slice
const cuponSlice = createSlice({
  name: "cupon",
  initialState: {
    code: " ",
    discount: 0,
    applied: false,
    message: " ",
  },
  reducers: {
    applyCupon: (state, action) => {
      const enteredCode = action.payload.toUpperCase();

      if (Cupons[enteredCode]) {
        state.code = enteredCode;
        state.discount = Cupons[enteredCode];
        state.applied = true;
        state.message = `Cupon ${enteredCode} applied! You got ${Cupons[enteredCode]}% discount.`;
      } else {
        state.message = "Invalid cupon code.";
      }
    },
  },
});

export const { applyCupon } = cuponSlice.actions;

// ---------- Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      let item = state.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQty: (state, action) => {
      let item = state.find((i) => i.id === action.payload.id);
      if (item) item.quantity += 1;
    },
    decreaseQty: (state, action) => {
      let item = state.find((i) => i.id === action.payload.id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        return state.filter((i) => i.id !== action.payload.id);
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((i) => i.id !== action.payload.id);
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeFromCart } = cartSlice.actions;


// ============================================================
// 3. CONFIGURE STORE
// ============================================================
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cupon: cuponSlice.reducer,
    veg: vegSlice.reducer,
    orders: ordersSlice.reducer,
    ordersList: getordersSlice.reducer,
    user:userSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
