import React, { useState, useEffect } from "react";
import "./style.css"
import { Row, Col, Table, Card, Carousel,Image, Switch   } from "antd";
import RenderFilmCardTsx from "../../components/filmDetails.tsx";
import RenderSeriesCardTsx from "../../components/serieDetails.tsx";
interface Film {
  title: string;
  overview: string;
  backdrop_path: string;
  key: string;
  vote_average: number;
  id:number;
}

interface Series {
  name: string;
  overview: string;
  backdrop_path: string;
  key: string;
  vote_average: number;
  id:number;
}

interface Props {}

export default function FilmsTsx(props: Props) {
  const [selected, setSelected] = useState<boolean>(false);
  const [listOfFilms, setListOfFilms]= useState<Film[]>([]);
  const [listOfSeries, setListOfSeries] = useState<Series[]>([]);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [filter,setFilter]=useState(0);
  const [selectedRowKey,setSelectedRowKey]=useState<Key[]>([0]);

  /* Get the list of the films from the API*/
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=ccb8c4972a273f9f96b565be82743d4c"
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
      });

    fetch(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=ccb8c4972a273f9f96b565be82743d4c"
    )
      .then((response) => response.json())
      .then((data) => {
        const series: Series[] = data.results.map((serie: Series, index: number) => {
          return {
            ...serie,
            key: index.toString(),
          };
        });
        setListOfSeries(series);
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

  const columnsSeries = [
    {
      title: 'Title',
      dataIndex: 'name',
    },
    {
      title:"Avg.",
      dataIndex:"vote_average",
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Film[]) => {
      setSelectedRowKey(selectedRowKeys);
      setTitle(selectedRows[0].title);
      setDesc(selectedRows[0].overview);
      setImg(selectedRows[0].backdrop_path);
      setId(selectedRows[0].id);
      setSelected(true);
    },
  };

  const rowSelectionSeries = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Series[]) => {
      setSelectedRowKey(selectedRowKeys);
      setTitle(selectedRows[0].name);
      setDesc(selectedRows[0].overview);
      setImg(selectedRows[0].backdrop_path);
      setId(selectedRows[0].id);
      setSelected(true);
    },
  };

  const onChangeSwitch = (checked: boolean) => {
    setFilter(checked?0:1);
    if(checked){
      setTitle(listOfFilms[0].title);
      setDesc(listOfFilms[0].overview);
      setImg(listOfFilms[0].backdrop_path);
      setSelected(false);
    }else{
      setTitle(listOfSeries[0].name);
      setDesc(listOfSeries[0].overview);
      setImg(listOfSeries[0].backdrop_path);
      setSelected(false);
    }
    setSelectedRowKey([]);
  };

  return(
    <>
      <Row style={{marginTop:50,marginBottom:50}}>
        <Col xs={24} xl={24} style={{backgroundColor:"ligthgray", width:"100%",marginBottom:30,marginLeft:40}}><h3 style={{display:"inline"}}>Show Films or Series:</h3><Switch style={{marginTop:0, marginLeft:10}} checkedChildren="Films" unCheckedChildren="Series" defaultChecked onChange={onChangeSwitch} /></Col>
        <Col xs={24} xl={8} style={{backgroundColor:"ligthgray", width:"100%",display:"flex", justifyContent:"center"}}>
          {filter === 0
          ?
          <Table
            dataSource={listOfFilms}
            columns={columns}
            style={{width:"90%"}}
            rowSelection={{
              selectedRowKeys:selectedRowKey,
              type: 'radio',
              ...rowSelection,
            }}
            pagination={{
              pageSize: 5,
            }}
          />:
          <Table
            dataSource={listOfSeries}
            columns={columnsSeries}
            style={{width:"90%"}}
            rowSelection={{
              selectedRowKeys:selectedRowKey,
              type: 'radio',
              ...rowSelectionSeries,
            }}
            pagination={{
              pageSize: 5,
            }}
          />
          }
        </Col>
        <Col xs={24} xl={14}  style={{backgroundColor:"ligthgray", display:"flex", justifyContent:"center",boxShadow:"box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"}}>
          {/* Show the detail card of the selected film or show the main page with a crousel of images */}
          {selected
          ?
            filter===0?<RenderFilmCardTsx img={img} title={title} desc={desc} films={listOfFilms} id={id}/>:<RenderSeriesCardTsx img={img} title={title} desc={desc} id={id} films={listOfSeries}/>
          :<>
            <Card
                  style={{boxShadow:"0 8px 8px -2px lightgray", backgroundColor:"whitesmoke",width:"90%", textAlign:"center"}}
                  title={<img alt="logo" src="https://picemup.com/img//logoGilenTvBlanco.png" style={{width:"120px"}}/>}
              >
                <div style={{display:"flex", justifyContent:"center",marginTop:20,marginBottom:20}}>
                  <div >
                    <h1>{filter === 0?"WELCOME TO GILENTV FILMS!":"WELCOME TO GILENTV SERIES!"}</h1>
                    {filter===0
                      ?<p style={{maxWidth:500,width:"100%",textAlign:"center"}}>On this page you can find information about the most popular movies of the moment. <b>To find out information about any of the movies, select any of them from the list.</b></p>
                      :<p style={{maxWidth:500,width:"100%",textAlign:"center"}}>On this page you can find information about the most popular series of the moment. <b>To find out information about any of the series, select any of them from the list.</b></p>
                    }
                  </div>
                </div>
                <Carousel effect="fade" style={{marginBottom:50}} autoplay>
                  {filter === 0?
                  listOfFilms.map(
                    (film: Film, index: number) => {
                        return <><Image key={film.key} alt={film.title} src={film.backdrop_path?"https://image.tmdb.org/t/p/w500/"+film.backdrop_path:"https://picemup.com/img/logoRecomend.jpg"} style={{width:"400px",borderRadius:"5px"}}/></>;
                    }
                )
                  :listOfSeries.map(
                        (serie: Series, index: number) => {
                            return <><Image key={serie.key} alt={serie.name} src={serie.backdrop_path?"https://image.tmdb.org/t/p/w500/"+serie.backdrop_path:"https://picemup.com/img/logoRecomend.jpg"} style={{width:"400px",borderRadius:"5px"}}/></>;
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
