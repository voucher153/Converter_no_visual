import React, { memo, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks"
import { CurrencySlice } from "../../../../reducers/CurrencySlice";
import c from './Valute.module.css'
import { props } from "../../../../models/componentsModels/props";

export interface newProps extends props {
    currency: string
    fromCurrency: string
    toCurrency: string
}

export const Valute = memo(function Valute({currency, fromCurrency, toCurrency, whatDoing}: newProps) {

    const dispatch = useAppDispatch();

    const changeCurrency = (e: React.MouseEvent<HTMLSpanElement>) => {
        
        whatDoing === 'from' ? 
            dispatch(CurrencySlice.actions.onFromCurrencyChange(currency)) :
            dispatch(CurrencySlice.actions.onToCurrencyChange(currency))
        
    }
    
    return(
        <span className={whatDoing === 'from' ? 
            currency === fromCurrency ? c.clicked : c.currency :
            currency === toCurrency ? c.clicked : c.currency} onClick={changeCurrency}>
            {currency}
        </span>
    )
})