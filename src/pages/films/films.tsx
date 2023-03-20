import React, { useState, useEffect } from "react";
import "./style.css"
import { Row, Col, Table, Card, Carousel,Image  } from "antd";
import RenderFilmCardTsx from "../../components/filmDetails.tsx";

interface Film {
  title: string;
  overview: string;
  backdrop_path: string;
  key: string;
  vote_average: number;
}

interface Props {}

export default function FilmsTsx(props: Props) {
  const [selected, setSelected] = useState<boolean>(false);
  const [listOfFilms, setListOfFilms]= useState<Film[]>([]);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [img, setImg] = useState<string>("");

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=ccb8c4972a273f9f96b565be82743d4c"
    )
      .then((response) => response.json())
      .then((data) => {
        const films: Film[] = data.results.map((film: Film, index: number) => {
          return {
            ...film,
            key: index.toString(),
          };
        });
        setListOfFilms(films);
        setTitle(films[0].title);
        setDesc(films[0].overview);
        setImg(films[0].backdrop_path);
      });
  }, []);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title:"Avg.",
      dataIndex:"vote_average",
    }
  ];

  return(
    <>
      <Row style={{marginTop:50,marginBottom:50}}>
        <Col xs={24} xl={8} style={{backgroundColor:"ligthgray", width:"100%",display:"flex", justifyContent:"center"}}>
          <Table
            dataSource={listOfFilms}
            columns={columns}
            rowSelection={{
              type:'radio',
              onChange:((selectedRowKeys: any, selectedRows: Film[]) => {
                setTitle(listOfFilms[parseInt(selectedRowKeys[0])].title);
                setDesc(listOfFilms[parseInt(selectedRowKeys[0])].overview);
                setImg(listOfFilms[parseInt(selectedRowKeys[0])].backdrop_path);
                setSelected(true);
              }) 
            }}
            pagination={{
              pageSize: 5,
            }}
          />
        </Col>
        <Col xs={24} xl={14}  style={{backgroundColor:"ligthgray", display:"flex", justifyContent:"center",boxShadow:"box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"}}>
          {selected
          ?<RenderFilmCardTsx img={img} title={title} desc={desc} films={listOfFilms}/>
          :<>
            <Card
                  style={{boxShadow:"0 8px 8px -2px lightgray", backgroundColor:"whitesmoke",width:"90%", textAlign:"center"}}
                  title={<img alt="logo" src="https://picemup.com/img//logoGilenTvBlanco.png" style={{width:"120px"}}/>}
              >
                <div style={{display:"flex", justifyContent:"center",marginTop:20,marginBottom:20}}>
                  <div >
                    <h1>WELCOME TO GILENTV!</h1>
                    <p style={{maxWidth:500,width:"100%",textAlign:"center"}}>On this page you can find information about the most popular movies of the moment. <b>To find out information about any of the movies, select any of them from the list.</b></p>
                  </div>
                </div>
                <Carousel effect="fade" style={{marginBottom:50}} autoplay>
                  {listOfFilms.map(
                        (film: Film, index: number) => {
                            return <><Image key={film.key} alt={film.title} src={"https://image.tmdb.org/t/p/w500/"+film.backdrop_path} style={{width:"400px",borderRadius:"5px"}}/></>;
                        }
                    )}
                  </Carousel>
            </Card>
          </>}
        </Col>
      </Row>
    </>
  );
};
