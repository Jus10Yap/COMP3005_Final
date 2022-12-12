import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
const { Header } = Layout;

//navigation bar and their paths
const NavBar = ({isLoggedIn,handleLogout}) => {
    return ( 
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1">
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/search">Search</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/track">Track</Link>
                </Menu.Item>
                { !isLoggedIn ?
                <Menu.Item key="4">
                    <Link to="/login">Login</Link>
                </Menu.Item>
                :
                <Menu.Item key="5" onClick={() => handleLogout()}>
                    Logout
                </Menu.Item>
                }
                <Menu.Item key="6">
                    <Link to="/report">Reports</Link>
                </Menu.Item>
                <Menu.Item key="7">
                    <Link to="/checkout">Check Out</Link>
                </Menu.Item>
                
                
                </Menu>
            </Header>
        </Layout>
    );
}
    
export default NavBar;