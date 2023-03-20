import React, { useContext } from "react";
import MyContext from "../../context/appcontext";
import '../../App.css';
import { Button} from "antd";

export default function Home(props) {
    const {color,setColor} = useContext(MyContext);
    return(
        <>
        <div className="App" >
            <header className="App-header" style={{backgroundColor:"#e5e5e5"}}>
                <img src="https://picemup.com/img/logoWebGilenTv.png"  alt="logo" style={{maxWidth:500,marginBottom:0}}/>
                <Button type="primary" href="/films" style={{backgroundColor:"black",color:"white",fontWeight:"bold"}}>WATCH MOVIES</Button>
            </header>
        </div>
        </>
    )
};