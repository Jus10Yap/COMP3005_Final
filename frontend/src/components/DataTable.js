import { Table } from "antd";

//search table - table of all the books in the bookstore
// table columns
const columns = [
  {
    title: "ISBN",
    dataIndex: "ISBN",
    key: "ISBN",
    render: (isbn) => <a href={`/book/${isbn}`}> {isbn} </a>,

  },
  {
    title: "Book Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "Publisher",
    dataIndex: "publisher_name",
    key: "publisher_name",
  },
  {
    title: "Genre",
    dataIndex: "genre",
    key: "genre",
  },
  {
    title: "Stock",
    dataIndex: "stockQuantity",
    key: "stockQuantity",
    render: (stock) => {
      if (stock >= 1) {
        return (
          <a>
            <img
              src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png"
              style={{ width: 30 }}
            ></img>{" "}
          </a>
        );
      } else {
        return (
          <a>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flat_cross_icon.svg/512px-Flat_cross_icon.svg.png?20170316053531"
              style={{ width: 30 }}
            ></img>{" "}
          </a>
        );
      }
    },
  },
];

const DataTable = ({ data }) => {
  return <Table dataSource={data} columns={columns} />;
};

export default DataTable;
