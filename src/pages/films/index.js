import React, { useState, useCallback, useEffect, useContext } from "react";
import MyContext from "../../context/appcontext";
import "./style.css"
import { Icon, Row, Col, Table, Input, Divider, Radio, Spin, Tooltip, Popconfirm, Card, notification } from "antd";
const { Meta } = Card;
export default function Films(props) {
    const {color,setColor} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [selectedRowKey, setSelectedRowKey] = useState([0]);

    const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
        },
        {
          key: '4',
          name: 'Disabled User',
          age: 99,
          address: 'Sydney No. 1 Lake Park',
        },
      ];

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        }
      ];

      const rowSelectionNew = {
        selectedRowKeys: selectedRowKey,
        
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKey(selectedRowKeys);
        },
  
        onSelect: (record, selected, selectedRows) => {
            getDataOnRow(record);
        },
  
        onSelectAll: (selected, selectedRows, changeRows) => {
        },
        type: "radio",
    };
  
    //recoger información de la linea seleccionada
    async function getDataOnRow(row) {
      console.log(row)
    //   //rellenar cuadro de propiedades
    //   let index = listOfArticles.indexOf(row);
    //   let props = [];
    //   row?props.push(<RenderArticleData key={parseInt(row.id_article)} id={parseInt(row.id_article)} name={row.name} article={row} rowNumber={parseInt(index)} reChargePage={getALLArticles} ></RenderArticleData>):props.push(<RenderArticleData key={0} id={0} name={""} ></RenderArticleData>);
    //   setPropiedades(props);
    }
  
    const clickRowNew = (row, b) => {
      
      const index = data.indexOf(row);
      if(index>9){
          setSelectedRowKey([parseInt(index%10)]);
      }else{
          setSelectedRowKey([index]);
      }
      getDataOnRow(row);
    };
    return(
        <>
        <Row>
        <Col span={24}><h1>GILENTV</h1></Col>
        </Row>
        <Row>
            <Col span={8} style={{backgroundColor:"ligthgray", width:"100%", display:"inline",padding:"50px",boxShadow:"box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"}}>
            <Table
                    dataSource={data}
                    columns={columns}
                    rowSelection={rowSelectionNew}
                    //onClick={() => clickRowNew}
                    pagination={{
                    pageSize: 10,
                    }}
                />
            </Col>
            <Col span={16} style={{backgroundColor:"ligthgray", width:"100%", display:"inline",padding:"50px",boxShadow:"box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"}}>
            <Card
                style={{boxShadow:"0 8px 8px -2px lightgray", backgroundColor:"whitesmoke"}}
                title={"Nombre de la peli"}
            >
                <Row gutter={16}>
                    <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: "100%" }}
                        cover={<img alt="example" style={{height:"auto",width:"100%"}} src="https://about.netflix.com/images/meta/netflix-symbol-black.png" />}
                    >
                        <Meta title="Europe Street beat" description="Recomended" />
                    </Card>
                    </Col>
                    <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: "100%" }}
                        cover={<img alt="example" style={{height:"auto",width:"100%"}} src="https://about.netflix.com/images/meta/netflix-symbol-black.png" />}
                    >
                        <Meta title="Europe Street beat" description="Recomended" />
                    </Card>
                    </Col>
                    <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: "100%" }}
                        cover={<img alt="example" style={{height:"auto",width:"100%"}} src="https://about.netflix.com/images/meta/netflix-symbol-black.png" />}
                    >
                        <Meta title="Europe Street beat" description="Recomended" />
                    </Card>
                    </Col>
                    <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: "100%" }}
                        cover={<img alt="example" style={{height:"auto",width:"100%"}} src="https://about.netflix.com/images/meta/netflix-symbol-black.png" />}
                    >
                        <Meta title="Europe Street beat" description="Recomended" />
                    </Card>
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