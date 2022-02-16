import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  createMigrate,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { Action } from "redux";
import appSlice from "./redux/appSlice";
import sideNavSlice from "./redux/sideNavSlice";
import { IAppState } from "./shared-interfaces/IAppState";
import { PersistConfig } from "redux-persist";
import { ISideNavState } from "./shared-interfaces/ISideNavState";

interface IStoreState {
  app: IAppState;
  sideNav: ISideNavState;
}
const persistConfig: PersistConfig<IStoreState> = {
  key: "root",
  version: 2,
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers<IStoreState>({
  app: appSlice,
  sideNav: sideNavSlice,
});

const persistedReducer = persistReducer<IStoreState, Action<any>>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
