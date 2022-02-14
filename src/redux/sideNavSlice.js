import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "sideNavSlice",
  initialState: {
    collapsed: false,
    selectedRoute: "analytic",
  },
  reducers: {
    setCollapsed: (s, action) => {
      s.collapsed = action.payload;
    },
    selectRoute: (s, action) => {
      s.selectedRoute = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCollapsed, selectRoute } = counterSlice.actions;

export default counterSlice.reducer;
