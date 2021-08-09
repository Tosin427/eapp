import React from "react";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import "./index.css";
import { Table } from "antd";

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
    title: "Amount",
    dataIndex: "address",
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
    dataIndex: "address",
    key: "5",
    width: 150,
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    date: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const Transactions = () => {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
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
