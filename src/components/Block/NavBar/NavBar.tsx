import React, { memo, useEffect, useMemo } from "react";
import classes from "./NavBar.module.css"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { Valute } from "./Valute/Valute";
import { INavBarCurrency } from "../../../models/componentsModels/INavBarCurrency";
import { DropDown } from "./DropDown/DropDown";
import { fetchCurrencyList } from "../../../redux/actions/ActionCreators";
import { Preloader } from "../../commonComponents/Preloader";
import { props } from "../../../models/componentsModels/props";


export const NavBar = memo( function NavBar({whatDoing}: props) {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCurrencyList())
    }, [])

    const valutes = useAppSelector(state => state.currencySlice.valutes)
    const fromCurrency = useAppSelector(state => state.currencySlice.fromCurrency)
    const toCurrency = useAppSelector(state => state.currencySlice.toCurrency) 

    const valutesElements = useMemo(() => valutes.map((cur: INavBarCurrency) => {
        return <Valute currency={cur.CharCode} fromCurrency={fromCurrency} toCurrency={toCurrency} whatDoing={whatDoing} key={cur.ID} />
    }), [ valutes ])

    const valutesFilterForList = valutes.filter((el, id) => id > 5)
    const valutesFilter = valutes.filter((el, id) => id <= 5)

    const valutesFilterElements = useMemo(() => valutesFilter.map((cur: INavBarCurrency) => {
        return <Valute currency={cur.CharCode} fromCurrency={fromCurrency} toCurrency={toCurrency} whatDoing={whatDoing} key={cur.ID} ></Valute>
    }), [ valutesFilter ])

    const isLenghtMany = (): boolean => {
        if (valutes.length > 5) {
            return true
        }
        return false
    }

    if (valutes.length === 0) {
        return <Preloader />
    }

    return(
        <>
            {isLenghtMany() ?
                <div className={classes.navbarFiltered}>
                    <div className={classes.valutes}>
                        {valutesFilterElements}
                    </div>
                    <DropDown elements={valutesFilterForList} firstComparing={fromCurrency} secondComparing={toCurrency} whatDoing={whatDoing} />
                </div> :
                <div className={classes.navbarFiltered}>
                    {valutesElements}
                </div>
            }
        </>
    )
})