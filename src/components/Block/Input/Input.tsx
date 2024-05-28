import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { CurrencySlice } from "../../../reducers/CurrencySlice";
import { props } from "../../../models/componentsModels/props";

export const Input = ({whatDoing}: props) => {

    const ref = useRef<HTMLInputElement>(null)

    const dispatch = useAppDispatch()

    const fromCurrency = useAppSelector(state => state.currencySlice.fromCurrency)
    const fromValue = useAppSelector(state => state.currencySlice.fromValue);
    const toValue = useAppSelector(state => state.currencySlice.toValue)

    useEffect(() => {

    
    }, [fromCurrency, fromValue])

    const onValueChange = () => {
        let inputValue;
        
        whatDoing === 'from' ? 
            inputValue = fromValue :
            inputValue = toValue;

        if (ref.current) inputValue = +ref.current.value
        
        if (whatDoing === 'from') {

            if (isNaN(inputValue)) {
                dispatch(CurrencySlice.actions.onFromValueChange(0))
                
            } else {
                dispatch(CurrencySlice.actions.onFromValueChange(inputValue))
            }
            
        } else {

            if (isNaN(inputValue)) {
                dispatch(CurrencySlice.actions.onToValueChange(0))
            
            } else {
                dispatch(CurrencySlice.actions.onToValueChange(inputValue))
            }
        } 
    }

    return(
        <>
            <input ref={ref} value={whatDoing === 'from' ? fromValue : toValue} onChange={onValueChange}></input>
        </>
    )
}