import { createSlice } from "@reduxjs/toolkit";
import Logger from "../logger/Logger";
import { IAppState } from "../shared-interfaces/IAppState";

const initialState = {
  authToken: "",
  cities: [],
  points: [],
  routes: [],
  claimTypes: [],
  services: [],
  logger: null,
} as IAppState;

export const counterSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setAuthToken: (s, action) => {
      s.authToken = action.payload;
    },
    setCities: (s, action) => {
      s.cities = action.payload;
    },
    setPoints: (s, action) => {
      s.points = action.payload;
    },
    setRoutes: (s, action) => {
      s.routes = action.payload;
    },
    setClaimTypes: (s, action) => {
      s.claimTypes = action.payload;
    },
    setServices: (s, action) => {
      s.services = action.payload;
    },
    setLogger: (s, action) => {
      s.logger = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAuthToken,
  setPoints,
  setCities,
  setRoutes,
  setClaimTypes,
  setServices,
  setLogger,
} = counterSlice.actions;

export default counterSlice.reducer;
