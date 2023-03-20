import '../../App.css';
import { Button} from "antd";

export default function Home(props) {
    return(
        <>
        <div className="App" >
            <header className="App-header" style={{backgroundColor:"#e5e5e5"}}>
                <img src="https://picemup.com/img/logoWebGilenTv.png"  alt="logo" style={{maxWidth:400,marginBottom:0}}/>
                <Button type="primary" href="/films" style={{backgroundColor:"black",color:"white",fontWeight:"bold"}}>WATCH MOVIES</Button>
            </header>
        </div>
        </>
    )
};