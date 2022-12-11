import { Table } from "antd";

// table columns
const columns = [
  {
    title: "Cart Item Number",
    dataIndex: "id",
    key: "id",

  },
  {
    title: "Book",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
];

const CheckoutTable = ({ data }) => {
  return <Table dataSource={data} columns={columns} />;
};

export default CheckoutTable;
