import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "appSlice",
  initialState: {
    authToken: "",
    cities: [],
    points: [],
    routes: [],
    claimTypes: [],
    services: [],
    userName: "",
    logText: "",
    logger: "",
  },
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
    setUserName: (s, action) => {
      s.userName = action.payload;
    },
    setLogText: (s, action) => {
      s.logText = action.payload;
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
  setUserName,
  setLogText,
  setLogger
} = counterSlice.actions;

export default counterSlice.reducer;
