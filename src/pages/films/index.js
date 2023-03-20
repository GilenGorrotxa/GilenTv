import React, { useState, useCallback, useEffect, useContext } from "react";
import MyContext from "../../context/appcontext";
import "./style.css"
import { Icon, Row, Col, Table, Input, Divider, Radio, Spin, Tooltip, Popconfirm, Card, notification } from "antd";
const { Meta } = Card;
export default function Films(props) {
    const {color,setColor} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [selectedRowKey, setSelectedRowKey] = useState([0]);
    const [listOfFilms, setListOfFilms]= useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    useEffect(() => {
        fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=ccb8c4972a273f9f96b565be82743d4c"
        )
        .then((response) => response.json())
        .then((data) => {
            // add a unique key value to each film object
            const films = data.results.map((film, index) => {
                return {
                    ...film,
                    key: index.toString(),
                };
            });
            setListOfFilms(films);
        });
    }, []);

      const columns = [
        // {
        //   title: 'Id',
        //   dataIndex: 'id',
        //   key:'id'
        // },
        {
          title: 'Name',
          dataIndex: 'title',
          //key:'title'
        },
        {
            title:"Nota",
            dataIndex:"vote_average",
            //key:'vote_average'
        }
      ];

      const rowSelectionNew = {
        selectedRowKeys: selectedRowKey,
        
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys);
            setTitle(listOfFilms[selectedRowKey].title)
            setDesc(listOfFilms[selectedRowKey].overview);
            setSelectedRowKey(selectedRowKeys);
        },
  
        onSelect: (record, selected, selectedRows) => {
            //console.log(record);
        },
        type: "radio",
    };
  
    //recoger información de la linea seleccionada
    async function getDataOnRow(row) {
      //console.log(row)
      //rellenar cuadro de propiedades
    //   let index = listOfArticles.indexOf(row);
    //   let props = [];
    //   row?props.push(<RenderArticleData key={parseInt(row.id_article)} id={parseInt(row.id_article)} name={row.name} article={row} rowNumber={parseInt(index)} reChargePage={getALLArticles} ></RenderArticleData>):props.push(<RenderArticleData key={0} id={0} name={""} ></RenderArticleData>);
    //   setPropiedades(props);
    }
  
    const clickRowNew = (row) => {
        console.log("hola");
        const index = listOfFilms.indexOf(row);
        
        if(index>4){
            setSelectedRowKey([parseInt(index%5)]);
        }else{
            setSelectedRowKey([index]);
        }
        //getDataOnRow(row);
        //console.log(row);
        // if(index > 9){
        //   setSelectedRowKey([parseInt(index%10)]);
        // } else {
        //     setSelectedRowKey([index]);
        // }
        //setSelectedRowKey([index]);
        //getDataOnRow(row);
      };
    return(
        <>
        <Row>
        <Col span={24} style={{display:"flex",justifyContent:"center", textAlign:"center"}}><><h1>GILENTV</h1></></Col>
        </Row>
        <Row >
            <Col span={8} style={{backgroundColor:"ligthgray", width:"100%", display:"inline",padding:"50px",boxShadow:"box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"}}>
            <Table
                    dataSource={listOfFilms}
                    columns={columns}
                    rowSelection={rowSelectionNew}
                    onClick={clickRowNew}
                    pagination={{
                    pageSize: 5,
                    }}
                />
            </Col>
            <Col span={14} style={{backgroundColor:"ligthgray", width:"100%", display:"inline",padding:"50px",boxShadow:"box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"}}>
            <Card
                style={{boxShadow:"0 8px 8px -2px lightgray", backgroundColor:"whitesmoke"}}
                title={"Nombre de la peli"}
            >
                <Row style={{display:"flex", justifyContent:"center",textAlign:"left",marginBottom:"50px", marginTop:"50px"}}>
                    <>
                    <Card
                        hoverable
                        style={{ width: "100%", maxWidth:"500px" }}
                        cover={<img alt="example" style={{height:"auto",width:"100%"}} src="https://about.netflix.com/images/meta/netflix-symbol-black.png" />}
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
                            style={{ width: "80%" }}
                            cover={<img alt="example" style={{height:"auto",width:"100%"}} src="https://about.netflix.com/images/meta/netflix-symbol-black.png" />}
                        >
                            <Meta title="Europe Street beat" description="Recomended" />
                        </Card>
                        </>
                    </Col>
                    <Col span={6} style={{display:"flex", justifyContent:"center",textAlign:"left"}}>
                        <>
                        <Card
                            hoverable
                            style={{ width: "80%" }}
                            cover={<img alt="example" style={{height:"auto",width:"100%"}} src="https://about.netflix.com/images/meta/netflix-symbol-black.png" />}
                        >
                            <Meta title="Europe Street beat" description="Recomended" />
                        </Card>
                        </>
                    </Col>
                    <Col span={6} style={{display:"flex", justifyContent:"center",textAlign:"left"}}>
                        <>
                        <Card
                            hoverable
                            style={{ width: "80%" }}
                            cover={<img alt="example" style={{height:"auto",width:"100%"}} src="https://about.netflix.com/images/meta/netflix-symbol-black.png" />}
                        >
                            <Meta title="Europe Street beat" description="Recomended" />
                        </Card>
                        </>
                    </Col>
                    <Col span={6} style={{display:"flex", justifyContent:"center",textAlign:"left"}}>
                        <>
                        <Card
                            hoverable
                            style={{ width: "80%" }}
                            cover={<img alt="example" style={{height:"auto",width:"100%"}} src="https://about.netflix.com/images/meta/netflix-symbol-black.png" />}
                        >
                            <Meta title="Europe Street beat" description="Recomended" />
                        </Card>
                        </>
                    </Col>
                </Row>
            </Card>
            </Col>
        </Row>
        {/* <Row>
            <Spin spinning={loading}>
                
                <Col xl={2} lg={24}></Col>
                <Col xl={10} lg={24} style={{backgroundColor:"ligthgray", width:"100%", display:"inline",padding:"50px"}}>
                    
                </Col>

                
                <Col xl={10} lg={24} style={{backgroundColor:"ligthgray", width:"100%", display:"inline"}}>
                <h3>INFO</h3>
                </Col>
                <Col xl={2} lg={24}></Col>
            </Spin>
        </Row> */}
        </>
    )
};