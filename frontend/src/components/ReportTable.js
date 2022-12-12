import { Table } from "antd";

//bookstores tracking table, tracks all orders of bookstore
// table columns
const columns = [
  {
    title: "Report Number",
    dataIndex: "id",
    key: "id",

  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Sales",
    dataIndex: "sales",
    key: "sales",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];

const ReportTable = ({ data }) => {
  return <Table dataSource={data} columns={columns} />;
};

export default ReportTable;
