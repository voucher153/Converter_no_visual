import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { CurrencySlice } from "../../reducers/CurrencySlice";

export const Reverse = () => {

    const dispatch = useAppDispatch()

    const fromCurrency = useAppSelector(state => state.currencySlice.fromCurrency)
    const toCurrency = useAppSelector(state => state.currencySlice.toCurrency)

    const fromValue = useAppSelector(state => state.currencySlice.fromValue)
    const toValue = useAppSelector(state => state.currencySlice.toValue)

    const clickReverse = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(CurrencySlice.actions.onFromCurrencyChange(toCurrency))
        dispatch(CurrencySlice.actions.onToCurrencyChange(fromCurrency))
        dispatch(CurrencySlice.actions.onFromValueChange(toValue))
        dispatch(CurrencySlice.actions.onToValueChange(fromValue))
    }

    return(
        <div onClick={clickReverse}>
            Reverse
        </div>
    )
};