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

import appSlice from "./redux/appSlice";
import sideNavSlice from "./redux/sideNavSlice";
const persistConfig = {
  key: "root",
  version: 2,
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  app: appSlice,
  sideNav: sideNavSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
