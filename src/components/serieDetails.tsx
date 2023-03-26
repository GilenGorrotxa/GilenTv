import React, { useState, useEffect } from "react";
import { Row, Col,Card} from "antd";
const { Meta } = Card;


interface Series {
    name: string;
    overview: string;
    backdrop_path: string;
    key: string;
    vote_average: number;
    img:string;
}
interface RecommendedSeries{
    img: string;
    title: string;
    desc:string;
}

export default function RenderSeriesCardTsx(props) {
    
    const [series, setSeries] = useState<RecommendedSeries[]>([]);
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [img, setImg] = useState<string>("");

    useEffect(() => {
        /* Update the information of the details card with the props and create the list of recommended series*/
        fetch(
            "https://api.themoviedb.org/3/tv/"+props.id+"/recommendations?api_key=ccb8c4972a273f9f96b565be82743d4c"
          )
            .then((response) => response.json())
            .then((data) => {
              const series: Series[] = data.results.map((serie: Series, index: number) => {
                return {
                  ...serie,
                  key: index.toString(),
                };
              });
              let recomendedSeries = series.map(serie => ({ title: serie.name, img: serie.backdrop_path, desc:serie.overview })).slice(0, 4);
              setSeries(recomendedSeries);
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
                {series.map(
                    (serie: RecommendedSeries, index: number) => {
                        return <>
                        <Col span={6} style={{display:"flex", justifyContent:"center",textAlign:"left"}}>
                            <>
                            <Card
                                hoverable
                                style={{ width:"90%" }}
                                cover={<img alt="example" style={{height:"auto",width:"100%"}} src={serie.img?"https://image.tmdb.org/t/p/w500/"+serie.img:"https://picemup.com/img/logoRecomend.jpg"} />}
                            >
                                <Meta title={serie.title} description="Recommended" />
                            </Card>
                            </>
                        </Col>
                        </>;
                    })
                }
                    {/* <Col span={6} style={{display:"flex", justifyContent:"center",textAlign:"left"}}>
                        <>
                        <Card
                            hoverable
                            style={{ width:"90%" }}
                            cover={<img alt="example" style={{height:"auto",width:"100%"}} src={series && series.length>0?"https://image.tmdb.org/t/p/w500/"+series[0].img:"https://picemup.com/img/logoRecomend.jpg"} />}
                        >
                            <Meta title={series && series.length>0?series[0].name:""} description="Recommended" />
                        </Card>
                        </>
                    </Col>
                    <Col span={6} style={{display:"flex", justifyContent:"center",textAlign:"left"}}>
                        <>
                        <Card
                            hoverable
                            style={{ width:"90%" }}
                            cover={<img alt="example" style={{height:"auto",width:"100%"}} src={series && series.length>0?"https://image.tmdb.org/t/p/w500/"+series[1].img:"https://picemup.com/img/logoRecomend.jpg"} />}
                        >
                            <Meta title={series && series.length>0?series[1].name:""} description="Recommended" />
                        </Card>
                        </>
                    </Col>
                    <Col span={6} style={{display:"flex", justifyContent:"center",textAlign:"left"}}>
                        <>
                        <Card
                            hoverable
                            style={{ width:"90%" }}
                            cover={<img alt="example" style={{height:"auto",width:"100%"}} src={series && series.length>0?"https://image.tmdb.org/t/p/w500/"+series[2].img:"https://picemup.com/img/logoRecomend.jpg"} />}
                        >
                            <Meta title={series && series.length>0?series[2].name:""} description="Recommended" />
                        </Card>
                        </>
                    </Col>
                    <Col span={6} style={{display:"flex", justifyContent:"center",textAlign:"left"}}>
                        <>
                        <Card
                            hoverable
                            style={{ width:"90%" }}
                            cover={<img alt="example" style={{height:"auto",width:"100%"}} src={series && series.length>0?"https://image.tmdb.org/t/p/w500/"+series[3].img:"https://picemup.com/img/logoRecomend.jpg"} />}
                        >
                            <Meta title={series && series.length>0?series[3].name:""} description="Recomended" />
                        </Card>
                        </>
                    </Col> */}
                </Row>
            </Card>
    )
}

