import { Layout, Menu, Checkbox, Input } from "antd";
import axios from "axios";
import TrackTable from "../components/TrackTable";
import { useState, useEffect } from "react";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { Search } = Input;

const TrackPage = () => {
 
   // table data
   const [data, setData] = useState([]);
 
   // user searched something in the search bar
   const onSearch = (id) => {
     console.log("order id = ", id);
 
     axios.get(`/track/order?id=${id}`).then(function (response) {
       setData(response.data);
       console.log(response.data);
     });
   };
 

   useEffect(() => {
     onSearch("");
   }, []);
 
   return (
     <Layout>
       <Sider width={300} className="site-layout-background">
         <Menu
           mode="inline"
           defaultSelectedKeys={["1"]}
           defaultOpenKeys={["sub1"]}
           style={{ height: "100%", borderRight: 0 }}
         >
           
           <SubMenu key="sub1" title="ORDER NUMBER">
             <Search
               key="id"
               placeholder="e.g. 123456"
               onSearch={onSearch}
               style={{ margin: 15, maxWidth: 270 }}
             />{" "}
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
           <TrackTable data={data}> </TrackTable>{" "}
         </Content>{" "}
       </Layout>{" "}
     </Layout>
   );
};

export default TrackPage;

