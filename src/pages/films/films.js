import React, { useState, useCallback, useEffect, useContext } from "react";
import MyContext from "../../context/appcontext";
import "./style.css"
import RenderFilmCard from "../../components/gilentv";
import { Row, Col, Table,Card } from "antd";

export default function Films(props) {
    const {color,setColor} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [selectedRowKey, setSelectedRowKey] = useState("0");
    const [listOfFilms, setListOfFilms]= useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState("");

    useEffect(() => {
        fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=ccb8c4972a273f9f96b565be82743d4c"
        )
        .then((response) => response.json())
        .then((data) => {
            const films = data.results.map((film, index) => {
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
          title: 'Name',
          dataIndex: 'title',
        },
        {
            title:"Nota",
            dataIndex:"vote_average",
        }
      ];

      const rowSelectionNew = {
        selectedRowKeys: selectedRowKey,
        
        onChange: (selectedRowKeys, selectedRows) => {
            setTitle(listOfFilms[selectedRowKeys[0]].title)
            setDesc(listOfFilms[selectedRowKeys[0]].overview);
            setImg(listOfFilms[selectedRowKeys[0]].backdrop_path)
            setSelectedRowKey(selectedRowKeys);
        },
  
        onSelect: (record, selected, selectedRows) => {
        },
        type: "radio",
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
                <RenderFilmCard img={img} title={title} desc={desc} films={listOfFilms}/>
            </Col>
        </Row>
        </>
    )
};