import { Table } from "antd";

// table columns
const columns = [
  {
    title: "Order Number",
    dataIndex: "id",
    key: "id",

  },
  {
    title: "Expected Ship Date",
    dataIndex: "expected_ship_date",
    key: "expected_ship_date",
  },
  {
    title: "Date of Receipt",
    dataIndex: "date_of_receipt",
    key: "date_of_receipt",
  },
  {
    title: "Shipping to",
    dataIndex: "address_line",
    key: "address_line",
  },
  {
    title: "Placed by",
    dataIndex: "placed_by",
    key: "placed_by",
  },
];

const TrackTable = ({ data }) => {
  return <Table dataSource={data} columns={columns} />;
};

export default TrackTable;
