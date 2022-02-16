import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import Logger from "../logger/Logger";
import { IAppState } from "../shared-interfaces/IAppState";
import ICity from "../shared-interfaces/ICity";
import { IClaimType } from "../shared-interfaces/IClaimType";
import IPoint from "../shared-interfaces/IPoint";
import { IRoute } from "../shared-interfaces/IRoute";
import { IService } from "../shared-interfaces/IService";

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
    setAuthToken: (s, action:PayloadAction<string>) => {
      s.authToken = action.payload;
    },
    setCities: (s, action: PayloadAction<ICity[]>) => {
      s.cities = action.payload;
    },
    setPoints: (s, action: PayloadAction<IPoint[]>) => {
      s.points = action.payload;
    },
    setRoutes: (s, action: PayloadAction<IRoute[]>) => {
      s.routes = action.payload;
    },
    setClaimTypes: (s, action: PayloadAction<IClaimType[]>) => {
      s.claimTypes = action.payload;
    },
    setServices: (s, action: PayloadAction<IService[]>) => {
      s.services = action.payload;
    },
    setLogger: (s, action:PayloadAction<Logger>) => {
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
