import React, { useState, useCallback, useEffect, useContext } from "react";
import MyContext from "../../context/appcontext";

export default function Films(props) {
    const {color,setColor} = useContext(MyContext);
    return(
        <>
        <h3>FILMS</h3>
        </>
    )
};