import { currencySlice } from './../reducers/CurrencySlice';
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducers = combineReducers({
    currencySlice
})

export const store = configureStore({
    reducer: rootReducers,

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
