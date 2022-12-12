import { Table } from "antd";
//table to be shown when a book is clicked on
// show the data of the book

// table columns
const columns = [
  {
    title: "ISBN",
    dataIndex: "ISBN",
    key: "ISBN",
  },
  {
    title: "Book Title",
    dataIndex: "title",
    key: "title"
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
    title: "Number of Pages",
    dataIndex: "num_pages",
    key: "num_pages",
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
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => <p> $ {price} </p>,
  },
  {
    title: "Add to Cart",
    render: (text, record) => (
      <button onClick={()=> console.log("Adding to cart")}>"Add to Cart"</button>)
  },
];

const BookTable = ({ data }) => {
  console.log(data);
  return <Table dataSource={data} columns={columns} />;
};

export default BookTable;
