import React, { useEffect, useRef, useState } from "react";
import classes from "./DropDown.module.css"
import { ICurrencyValute } from "../../../../models/ICurrencyValute";
import { Valute } from "../Valute/Valute";
import { INavBarCurrency } from "../../../../models/componentsModels/INavBarCurrency";
import { props } from "../../../../models/componentsModels/props";

interface newProps extends props {
    elements: Array<ICurrencyValute>,
    firstComparing: string,
    secondComparing: string,
}

export const DropDown = ({elements, firstComparing, secondComparing, whatDoing}: newProps) => {

    const ref = useRef<HTMLDivElement>(null)
    const scndRef = useRef<HTMLUListElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const menuClicking = (e: React.MouseEvent<HTMLSpanElement>): void => {
        if (isOpen) {
            setIsOpen(false)
        } else setIsOpen(true)
        
    }

    const newElements = elements.map((cur: INavBarCurrency) => {
        return (
            <li>
                <Valute currency={cur.CharCode} fromCurrency={firstComparing} toCurrency={secondComparing} whatDoing={whatDoing}></Valute>
            </li>
        )
    })

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const { target } = e;
            if (target instanceof Node && !ref.current?.contains(target) && !scndRef.current?.contains(target)) {
                setIsOpen(false)
            }
        }

        window.addEventListener('click', handleClick)

        return () => {window.removeEventListener('click', handleClick)}

    }, [ isOpen ])

    return (
        <div className={classes.dropdown}>
            <span className={classes.menu} ref={ref} onClick={menuClicking}>{whatDoing === 'from' ? firstComparing : secondComparing}</span>
            {isOpen ? 
                <ul ref={scndRef} className={classes.list} >{newElements}</ul> :
                null}
        </div>
        
    )

}