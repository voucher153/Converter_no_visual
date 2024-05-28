import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"
import { ICurrencyValute, IRates } from "../models/ICurrencyValute";

interface TypeCurrencyState {
    valutes: Array<ICurrencyValute>,
    fromValue: number,
    toValue: number,
    lastFromValue: number,
    lastToValue: number,
    rates: Record<string, IRates>,
    fromCurrency: string,
    toCurrency: string,
    lastFromCurrency: string,
    lastToCurrency: string,
    isLoading: boolean,
    error: string | null
    whatDoing: string
}

const initialState: TypeCurrencyState = {
    valutes: [],
    fromValue: 0,
    toValue: 0,
    lastFromValue: 0,
    lastToValue: 0,
    rates: {},
    fromCurrency: 'EUR',
    toCurrency: 'USD',
    lastFromCurrency: 'EUR',
    lastToCurrency: 'USD',
    isLoading: false,
    error: null,
    whatDoing: 'from'
}

export const CurrencySlice = createSlice({
    name: 'Valutes',
    initialState,
    reducers: {
        currencyFetching(state) {
            state.error = null
            state.isLoading = true;
        },
        currencyFetchingSuccess(state, action: PayloadAction<Array<ICurrencyValute>>) {
            state.error = null
            state.isLoading = false
            state.valutes = action.payload
        },
        currencyFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload
        },

        onFromValueChange(state, action: PayloadAction<number>) {

            state.lastFromValue = state.fromValue;

            const price: number = action.payload / state.rates[state.fromCurrency].Value;
            const result: number = price * state.rates[state.toCurrency].Value

            state.fromValue = action.payload
            state.toValue = result
            
        },
        onToValueChange(state, action: PayloadAction<number>) {

            state.lastToValue = state.toValue

            const price: number = action.payload / state.rates[state.toCurrency].Value;
            const result: number = price * state.rates[state.fromCurrency].Value
            
            state.fromValue = result
            state.toValue = action.payload
            
        },

        onFromCurrencyChange(state, action: PayloadAction<string>) {
            
            state.lastFromCurrency = state.fromCurrency
            state.lastToCurrency = state.toCurrency

            state.fromCurrency = action.payload
            
            if (state.fromCurrency === state.toCurrency) {
                state.fromCurrency = state.lastToCurrency 
                state.toCurrency = state.lastFromCurrency
                
            }

            const price: number = state.fromValue / state.rates[state.fromCurrency].Value;
            const result: number = price * state.rates[state.toCurrency].Value

            state.toValue = result
        },
        onToCurrencyChange(state, action: PayloadAction<string>) {
            
            debugger
            state.lastToCurrency = state.toCurrency
            state.lastFromCurrency = state.fromCurrency
            
            state.toCurrency = action.payload
            
            if (state.fromCurrency === state.toCurrency) {
                state.toCurrency = state.lastFromCurrency 
                state.fromCurrency = state.lastToCurrency
            }

            const price: number = state.toValue / state.rates[state.toCurrency].Value;
            const result: number = price * state.rates[state.fromCurrency].Value

            state.fromValue = result

        },
        
        setRates(state, action: PayloadAction<{}>) {
            state.rates = action.payload
        }
    }
})

export const currencySlice = CurrencySlice.reducer