import React, { useState, useEffect } from "react";
import { Row, Col,Card} from "antd";
const { Meta } = Card;

interface Film {
    title: string;
    backdrop_path: string;
    overview: string;
    img:string;
}

export default function RenderFilmCardTsx(props) {
    
    const [films, setFilms] = useState<Film[]>([]);
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [img, setImg] = useState<string>("");

    useEffect(() => {
        /* Update the information of the details card with the props and create the list of recommended films*/
        let recomend = props.films.map(film => ({ title: film.title, img: film.backdrop_path, desc:film.overview }));
        setFilms(recomend);
        setTitle(props.title?props.title:"");
        setDesc(props.desc?props.desc:"")
        setImg(props.desc?"https://image.tmdb.org/t/p/w500/"+props.img:"https://picemup.com/img/logoRecomend.jpg")
    }, [props]);

    return(
        <Card
                style={{boxShadow:"0 8px 8px -2px lightgray", backgroundColor:"whitesmoke", width:"90%",}}
                title={<img alt="logo" src="https://picemup.com/img//logoGilenTvBlanco.png" style={{width:"120px"}}/>}
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

