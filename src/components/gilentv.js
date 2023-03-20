import React, { useState, useCallback, useEffect, useContext } from "react";
import MyContext from "../context/appcontext";

import { Row, Col,Card} from "antd";
const { Meta } = Card;

export default function RenderFilmCard(props) {
    
    const [films, setFilms] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState("");

    useEffect(() => {
        let recomend = props.films.map(film => ({ title: film.title, img: film.backdrop_path, desc:film.overview }));
        console.log(recomend)
        setFilms(recomend);
        setTitle(props.title?props.title:"");
        setDesc(props.desc?props.desc:"")
        setImg(props.desc?"https://image.tmdb.org/t/p/w500/"+props.img:"https://picemup.com/img/logoRecomend.jpg")
    }, [props]);
    return(
        <Card
                style={{boxShadow:"0 8px 8px -2px lightgray", backgroundColor:"whitesmoke"}}
                title={<img src="https://picemup.com/img//logoGilenTvBlanco.png" style={{width:"120px"}}/>}
            >
                <Row style={{display:"flex", justifyContent:"center",textAlign:"left",marginBottom:"50px", marginTop:"50px"}}>
                    <>
                    <Card
                        hoverable
                        style={{ width: "100%", maxWidth:"500px" }}
                        cover={<img alt="example" style={{height:"auto",width:"100%"}} src={img} />}
                    >
                        <Meta title={title} description={desc} />
                    </Card>
                    </>
                </Row>
                <Row gutter={16}>
                    <Col span={6} style={{display:"flex", justifyContent:"center",textAlign:"left"}}>
                        <>
                        <Card
                            hoverable
                            style={{ width:"90%" }}
                            cover={<img alt="example" style={{height:"auto",width:"100%"}} src={films && films.length>0?"https://image.tmdb.org/t/p/w500/"+films[0].img:"https://picemup.com/img/logoRecomend.jpg"} />}
                        >
                            <Meta title={films && films.length>0?films[0].title:""} description="Recommended" />
                        </Card>
                        </>
                    </Col>
                    <Col span={6} style={{display:"flex", justifyContent:"center",textAlign:"left"}}>
                        <>
                        <Card
                            hoverable
                            style={{ width:"90%" }}
                            cover={<img alt="example" style={{height:"auto",width:"100%"}} src={films && films.length>0?"https://image.tmdb.org/t/p/w500/"+films[1].img:"https://picemup.com/img/logoRecomend.jpg"} />}
                        >
                            <Meta title={films && films.length>0?films[1].title:""} description="Recommended" />
                        </Card>
                        </>
                    </Col>
                    <Col span={6} style={{display:"flex", justifyContent:"center",textAlign:"left"}}>
                        <>
                        <Card
                            hoverable
                            style={{ width:"90%" }}
                            cover={<img alt="example" style={{height:"auto",width:"100%"}} src={films && films.length>0?"https://image.tmdb.org/t/p/w500/"+films[2].img:"https://picemup.com/img/logoRecomend.jpg"} />}
                        >
                            <Meta title={films && films.length>0?films[2].title:""} description="Recommended" />
                        </Card>
                        </>
                    </Col>
                    <Col span={6} style={{display:"flex", justifyContent:"center",textAlign:"left"}}>
                        <>
                        <Card
                            hoverable
                            style={{ width:"90%" }}
                            cover={<img alt="example" style={{height:"auto",width:"100%"}} src={films && films.length>0?"https://image.tmdb.org/t/p/w500/"+films[3].img:"https://picemup.com/img/logoRecomend.jpg"} />}
                        >
                            <Meta title={films && films.length>0?films[3].title:""} description="Recomended" />
                        </Card>
                        </>
                    </Col>
                </Row>
            </Card>
    )
}

