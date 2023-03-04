import { combineReducers, configureStore } from "@reduxjs/toolkit";
import transitionReducer from "./transition/transition.slice";
import statusReducer from "./status/status.slice";

const rootReducer = combineReducers({
    transitions: transitionReducer,
    statuses: statusReducer,
});
export const store = configureStore({
    reducer: rootReducer,
});
export type RootStore = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
