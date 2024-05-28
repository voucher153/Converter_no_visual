
import axios from "axios";
import { AppDispatch } from "../store";
import { CurrencySlice } from "../../reducers/CurrencySlice";

export const fetchCurrencyList = () => async (dispatch: AppDispatch) => {
    try {

        dispatch(CurrencySlice.actions.currencyFetching())
        const responce = await axios.get(`https://www.cbr-xml-daily.ru/daily_json.js`)
        dispatch(CurrencySlice.actions.currencyFetchingSuccess(Object.values(responce.data.Valute)))
        dispatch(CurrencySlice.actions.setRates(responce.data.Valute))

    } catch (e: any) {

        dispatch(CurrencySlice.actions.currencyFetchingError(e.message))
    }
}