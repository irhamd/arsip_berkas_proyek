import React, { useEffect, useState } from 'react';
import { Card, List, Avatar, Descriptions, Spin, Transfer, Form } from 'antd';


import { DivCol, _Button, _Checkbox, _Input, _RadioGroup, _Switch, _Text, _TitleBar } from '../../../services/Forms/Forms';
import { _Col, _Row } from '../../../services/Forms/LayoutBootstrap';
import { useHistory } from 'react-router';
import _Api from '../../../services/Api/_Api';
import { DownloadOutlined, RollbackOutlined, UserDeleteOutlined } from '@ant-design/icons';


function ListMahasiswa() {
 
    const [loading, setloading] = useState(false);
    const [dataMahasiswa, setdataMahasiswa] = useState([]);

    const histori = useHistory()
    const [form] = Form.useForm();

    const loadData = () => {
        _Api.get("topic-member/28").then(res => {
            setdataMahasiswa(res.data)
        })
    }

    useEffect(() => {
        loadData()
    }, [])

    


    return (
        <div>
            <Card title={" * List Mahasiswa"} size="small">
                <br />
                <List
                    itemLayout="vertical" size="small" pagination={{ pageSize: 5 }} loading={loading}
                    dataSource={dataMahasiswa}
                    renderItem={item => (
                        <List.Item extra={<p> <_Button danger label="Hapus" icon={<UserDeleteOutlined /> }/> </p>
                        }>
                            <List.Item.Meta
                                avatar={<Avatar src="https://cdn-icons-png.flaticon.com/512/2302/2302834.png" />}
                                // title={<a>{JSON.stringify(item)}</a>}
                                title={`${item.member && item.member.student.user.first_name}`}
                                description={<a>{item.member && item.member.student.nim}</a>}

                            />
                        </List.Item>
                    )}
                />,
            </Card>
        </div>
    )
}

export default ListMahasiswa
