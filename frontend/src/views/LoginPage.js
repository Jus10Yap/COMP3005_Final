import { Card, Form, Input, Button } from "antd";
import axios from "axios";
import {Redirect} from "react-router-dom";
import "../css/LoginPage.css"

//login page
const LoginPage = ({handleLogin}) => {
    const [form] = Form.useForm();
    //IF user exists
    const onFinish = (values) => {
        console.log('Success: ', values);
        login(values.username, values.password);
    }

    //logging in
    const login = (username, password) => { 
        axios.post(`/search/login`, {username, password})
            .then(function (response) {
                if(response.data.success === false){  
                    console.log(response.data);                  
                    alert(response.data.message);                    
                } else {                   
                    console.log(response.data);
                    handleLogin(response.data.employee[0].username);
                    return () => <Redirect to="/"/>;
                }
        })       
    }

    return ( 
        <div>
            <Card title="Log In" size="small">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Enter username',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>              
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Enter password',
                    },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
                </Form>
            </Card>
        </div>
     );
}
 
export default LoginPage;