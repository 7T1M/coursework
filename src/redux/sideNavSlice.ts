import { createSlice } from "@reduxjs/toolkit";
import { ISideNavState } from "../shared-interfaces/ISideNavState";

const initialState = {
  collapsed: false,
  selectedRoute: "analytic",
} as ISideNavState;

export const counterSlice = createSlice({
  name: "sideNavSlice",
  initialState,
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
