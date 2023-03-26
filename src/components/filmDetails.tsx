import React, { useState, useEffect } from "react";
import { Row, Col,Card} from "antd";
const { Meta } = Card;

interface Film {
    title: string;
    backdrop_path: string;
    overview: string;
    img:string;
}

interface RecommendedFilm {
    img: string;
    title: string;
    desc:string;
}

export default function RenderFilmCardTsx(props) {
    
    const [recomendedFilms, setRecommendedFilms]= useState<RecommendedFilm[]>([]);
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [img, setImg] = useState<string>("");

    useEffect(() => {
        /* Update the information of the details card with the props and create the list of recommended films*/
        fetch(
            "https://api.themoviedb.org/3/movie/"+props.id+"/recommendations?api_key=ccb8c4972a273f9f96b565be82743d4c"
          )
            .then((response) => response.json())
            .then((data) => {
              const films: Film[] = data.results.map((film: Film, index: number) => {
                return {
                  ...film,
                  key: index.toString(),
                };
              });
              let recomendedFilms = films.map(film => ({ title: film.title, img: film.backdrop_path, desc:film.overview })).slice(0, 4);
              setRecommendedFilms(recomendedFilms);
            });
        setTitle(props.title?props.title:"");
        setDesc(props.desc?props.desc:"")
        setImg(props.img?"https://image.tmdb.org/t/p/w500/"+props.img:"https://picemup.com/img/logoRecomend.jpg")
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
                    {recomendedFilms.map(
                        (film: RecommendedFilm, index: number) => {
                            return <>
                            <Col span={6} style={{display:"flex", justifyContent:"center",textAlign:"left"}}>
                                <>
                                <Card
                                    hoverable
                                    style={{ width:"90%" }}
                                    cover={<img alt="example" style={{height:"auto",width:"100%"}} src={film.img?"https://image.tmdb.org/t/p/w500/"+film.img:"https://picemup.com/img/logoRecomend.jpg"} />}
                                >
                                    <Meta title={film.title} description="Recommended" />
                                </Card>
                                </>
                            </Col>
                            </>;
                        })
                    }
                </Row>
            </Card>
    )
}

