import React, { useEffect } from "react";
import classes from "./Block.module.css"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchCurrencyList } from "../../redux/actions/ActionCreators";
import { NavBar } from "./NavBar/NavBar";
import { Input } from "./Input/Input";
import { props } from "../../models/componentsModels/props";


export const Block = ({whatDoing}: props) => {

    return(
        <div className={classes.block}>
            <NavBar whatDoing={whatDoing} />
            <Input whatDoing={whatDoing} />
        </div>
    )
};