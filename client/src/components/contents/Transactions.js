import React, { useState, useEffect } from "react";
import axios from "axios";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import "./index.css";
import { Table } from "antd";

const Transactions = () => {
  // console.log(getData[0].confirmed);
  const columns = [
    {
      title: "Date",
      width: 100,
      dataIndex: "date",
      key: "date",
      fixed: "left",
    },
    {
      title: "Type",
      width: 100,
      dataIndex: "age",
      key: "age",
      fixed: "left",
    },
    {
      title: "Currency",
      dataIndex: "address",
      key: "1",
      width: 150,
    },
    {
      title: "Mode",
      dataIndex: "address",
      key: "2",
      width: 150,
    },
    {
      title: "Sent",
      dataIndex: "sent",
      key: "3",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "address",
      key: "4",
      width: 150,
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "5",
      width: 150,
    },
  ];


  const [getData, setGetData] = useState([]);

  useEffect(() => {
    axios
      .get(
        // "https://blockchain.info/rawaddr/1HqUb1yWNgdbuvpbijz6FxRXzkGdQnmuZj"
        `https://api.blockcypher.com/v1/btc/main/addrs/1HqUb1yWNgdbuvpbijz6FxRXzkGdQnmuZj`
      )
      .then((response) => setGetData(response.data.txrefs))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={getData.map((data, index) => ({key: index, date: data.value}))}
        scroll={{ x: 1500 }}
        summary={(pageData) => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={2}>
                Fix Left
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2} colSpan={8}>
                Scroll Context
              </Table.Summary.Cell>
              <Table.Summary.Cell index={10}>Fix Right</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
        sticky
      />
      ,
    </div>
  );
};

export default Transactions;
