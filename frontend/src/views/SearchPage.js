import { Layout, Menu, Checkbox, Input } from "antd";
import axios from "axios";
import DataTable from "../components/DataTable";
import { useState, useEffect } from "react";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { Search } = Input;

const SearchPage = () => {
  // sidemenu data
  const [genBox, setGenBox] = useState([]);
  const [authBox, setAuthBox] = useState([]);
  const [pubBox, setPubBox] = useState([]);

  // checkboxes
  const [gen, setGen] = useState([]);
  const [auth, setAuth] = useState([]);
  const [pub, setPub] = useState([]);

  // table data
  const [data, setData] = useState([]);

  // populate the checkboxes of the sidebar
  const initSider = () => {
    axios.get(`/search/genre`).then(function (response) {
      setGenBox(
        response.data.map(function getName(res) {
          return res.genre;
        })
      );
      console.log(response.data);
    });

    axios.get(`/search/author`).then(function (response) {
      setAuthBox(
        response.data.map(function getName(res) {
          return res.author;
        })
      );
      console.log(response.data);
    });

    axios.get(`/search/publisher`).then(function (response) {
      setPubBox(
        response.data.map(function getName(res) {
          return res.publisher_name;
        })
      );
      console.log(response.data);
    });
  };

  // user searched something in the search bar
  const onSearch = (title) => {
    console.log("title = ", title);

    axios.get(`/search/book?title=${title}`).then(function (response) {
      setData(response.data);
      console.log(response.data);
    });
  };

  const onISBNSearch = (isbn) => {
    console.log("isbn = ", isbn);

    axios.get(`/search/book?isbn=${isbn}`).then(function (response) {
      setData(response.data);
      console.log(response.data);
    });
  };

  // user checks/unchecks a checkbox
  const onCheck = (checkedValues, setter) => {
    //console.log('checked = ', checkedValues);
    setter(checkedValues);
  };

  useEffect(() => {
    onSearch("");
    initSider();
  }, []);

  useEffect(() => {
    console.log(gen, auth, pub);
    axios.post("/search/books", { gen, auth, pub }).then(function (response) {
      setData(response.data);
    });
  }, [gen, auth, pub]);

  return (
    <Layout>
      <Sider width={300} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <SubMenu key="sub0" title="ISBN">
            <Search
              key="ISBN"
              placeholder="e.g. 23452"
              onSearch={onISBNSearch}
              style={{ margin: 15, maxWidth: 270 }}
            />{" "}
          </SubMenu>{" "}
          <SubMenu key="sub1" title="TITLE">
            <Search
              key="title"
              placeholder="e.g. God of War"
              onSearch={onSearch}
              style={{ margin: 15, maxWidth: 270 }}
            />{" "}
          </SubMenu>{" "}
          
          <SubMenu key="sub2" title="GENRE">
            <Checkbox.Group
              key="gen"
              options={genBox}
              onChange={(checkedValues) => onCheck(checkedValues, setGen)}
            >
              {" "}
            </Checkbox.Group>{" "}
          </SubMenu>{" "}
          <SubMenu key="sub3" title="AUTHOR">
            <Checkbox.Group
              key="auth"
              options={authBox}
              onChange={(checkedValues) => onCheck(checkedValues, setAuth)}
            >
              {" "}
            </Checkbox.Group>{" "}
          </SubMenu>{" "}
          <SubMenu key="sub4" title="PUBLISHER">
            <Checkbox.Group
              key="pub"
              options={pubBox}
              onChange={(checkedValues) => onCheck(checkedValues, setPub)}
            >
              {" "}
            </Checkbox.Group>{" "}
          </SubMenu>{" "}
        </Menu>{" "}
      </Sider>{" "}
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            height: "100vh",
            top: 64,
          }}
        >
          <DataTable data={data}> </DataTable>{" "}
        </Content>{" "}
      </Layout>{" "}
    </Layout>
  );
};

export default SearchPage;
