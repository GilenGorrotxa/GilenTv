import React, { useState, useEffect } from "react";
import "./style.css"
import { Row, Col, Table, Card } from "antd";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKey, setSelectedRowKey] = useState<string>("0");
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
        setSelectedRowKey("0");
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

  const rowSelectionNew = {
    selectedRowKeys: selectedRowKey,
    onChange: (selectedRowKeys: string[], selectedRows: Film[]) => {
      setTitle(listOfFilms[parseInt(selectedRowKeys[0])].title);
      setDesc(listOfFilms[parseInt(selectedRowKeys[0])].overview);
      setImg(listOfFilms[parseInt(selectedRowKeys[0])].backdrop_path);
      setSelectedRowKey(selectedRowKeys[0]);
    },
    onSelect: (record: Film, selected: boolean, selectedRows: Film[]) => {},
    type: 'radio' as const, 
  };
  
  return(
    <>
      <Row style={{marginTop:50,marginBottom:50}}>
        <Col span={8} style={{backgroundColor:"ligthgray", width:"100%",display:"flex", justifyContent:"center"}}>
          <Table
            dataSource={listOfFilms}
            columns={columns}
            rowSelection={rowSelectionNew}
            pagination={{
              pageSize: 5,
            }}
          />
        </Col>
        <Col span={14} style={{backgroundColor:"ligthgray", display:"flex", justifyContent:"center",boxShadow:"box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"}}>
          <RenderFilmCardTsx img={img} title={title} desc={desc} films={listOfFilms}/>
        </Col>
      </Row>
    </>
  );
};
