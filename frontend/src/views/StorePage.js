import { Card, Descriptions, Form, Input, InputNumber, Select, Button, Table } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookTable from '../components/BookTable';

const StorePage = () => {
    const { name } = useParams();
    
    const [book, setBook] = useState();
    const [works, setWorks] = useState(false);
    const [data, setData] = useState([]);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success: ', values);
        // upload data to db
        axios.post('/book/upload', { values, name })
            .then(function (response) {
                if (response.data.success === true) {
                    alert('Data uploaded sucessfully')
                }
            })
    }

    const getBook = (isbn) => {
        axios.get(`/book/${isbn}`).then(function (response) {
    
          setBook(response.data);
          console.log(response.data);
        })
    };

    const getBookInfo = (name) => {
        axios.get(`/search/book?isbn=${name}`)
            .then(function (response) {
                console.log(response.data)
                setData(response.data);
            })

    }

    // check if the user that's logged in works at this store
    const checkWorks = () => {
        let userID = sessionStorage.getItem('userID');
        console.log(userID)

        axios.get(`/search/owner?username=${userID}`)
            .then(function (response) {
                console.log(response.data)
                if (response.data.success === true) {
                    if (response.data.owner[0].username === name) {
                        setWorks(true);
                    }
                }
            })
    }

    useEffect(() => {
        getBook(name);
        checkWorks();
        getBookInfo(name);

    }, [name]);

    return (
        <>
            {book ?
                <div>
                    <Descriptions title={book.ISBN}>
                        <Descriptions.Item label="ISBN">{book.ISBN}</Descriptions.Item>
                                
                    </Descriptions>
                    <BookTable data={data} />

                </div>

                : <p>No book found!</p>}

            {works ?
                <Card title="Enter new book">
                    <Form
                        form={form}
                        layout="horizontal"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Book IBSN"
                            name="IBSN"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter book IBSN',
                                },
                            ]}>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter Book title',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Author"
                            name="author"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter Book Author',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Publisher ID"
                            name="publisher_id"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter book publisher id',
                                },
                            ]}>
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item
                            label="Genre"
                            name="genre"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter Book genre',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="stock quantity"
                            name="stockQuantity"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter stock quantity',
                                },
                            ]}>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter price',
                                },
                            ]}>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="publisher's percentage share"
                            name="publisher_percentage"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter publisher\'s percentage share',
                                },
                            ]}>
                            <InputNumber />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Upload Data
                        </Button>

                    </Form>
                </Card>

                : <p></p>
            }

        </>

    );
}

export default StorePage;