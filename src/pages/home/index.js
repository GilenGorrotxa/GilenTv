import React, { useState, useCallback, useEffect, useContext } from "react";
import MyContext from "../../context/appcontext";
import '../../App.css';
import logo from '../../logo.svg';
import { Button} from "antd";

export default function Home(props) {
    const {color,setColor} = useContext(MyContext);
    return(
        <>
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>{color}</h1>
                <input type="text" value={color} onChange={(e)=> setColor(e.target.value)}/>
                <Button type="primary" href="/films">VER PELIS</Button>
            </header>
        </div>
        </>
    )
};