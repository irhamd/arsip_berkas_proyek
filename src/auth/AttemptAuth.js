import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { AppstoreOutlined, KeyOutlined, MailOutlined, PoweroffOutlined, UnlockOutlined, IdcardTwoTone, SmileTwoTone, BulbTwoTone, UnlockTwoTone, UserOutlined, HighlightFilled, ImportOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout'
import { _Button } from '../services/Forms/Forms';
import { globalText } from '../services/Text/GlobalText';
import { acakText } from '../services/Crypto';
// import _Api from '../services/Api/_ApiBase';
import { _Toastr } from '../services/Toastr/Notify/_Toastr';
import { LogOut } from '.';
// import _ApiBase from '../services/Api/_ApiBase';
import axios from 'axios';
import { baseURL_R } from '../services/Api/BaseUrl';


function AttemptAuth() {

    const histori = useHistory();
    const [obj, setobj] = useState({})
    const [username, setUsername] = useState()
    const [password, setpassword] = useState()
    // const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        LogOut();
    }, [])

    const attemptLogin = () => {

        try {


            setLoading(true)
            // window.location.href = "/home";

            let obj = {
                username: username,
                password: password
            }

            axios.post(`${baseURL_R}account/user/login`, obj).then(res => {
                const data = res.data;
                // console.log(res)

                if (data) {
                    let user = JSON.stringify(res.data);
                    sessionStorage.setItem(globalText.x_auth_resu, acakText(user))
                    sessionStorage.setItem(globalText.x_auth_user, acakText("ajak-ajak"))
                    sessionStorage.setItem(globalText.x_auth_access_token, acakText(data.access_token))
                    sessionStorage.setItem(globalText.x_auth_refresh_token, acakText(data.refresh_token))
                    sessionStorage.setItem(globalText.authorization, acakText(data.role))
                    sessionStorage.setItem('token', data.access_token)
                    window.location.href = "/home";
                } else {
                    _Toastr.error("Akses di tolak ...")
                    setLoading(false)
                    return
                }
                // setError(false)
            }).catch(err => {
                setLoading(false)
                _Toastr.error("Gagal terhubung ke server, Periksa jaringan anda ...")

            })
        } catch (error) {
            setLoading(false)
            _Toastr.error("Gagal terhubung ke server, Periksa jaringan anda ...")
        }
    }


    return (
        <div style={{ background: "linear-gradient(#ffffff 10%, rgb(102, 198, 236))", height: "100vh", overflow: "auto" }} >
            <h1 style={{ textAlign: "center", marginTop: "8%" }}></h1>
            <div style={{ textAlign: "center" }}>
                <p><img width="300" src={"https://cdn-icons-png.flaticon.com/512/2949/2949787.png"} alt="" /></p>
                <p style={{ textAlign: "center", fontWeight: "bolder" }}> <span style={{ color: "#258fe6f7" }}> SYSTEM </span> PEMBELAJARAN ONLINE </p>

                {/* <b> Silahkan Login </b> */}
            </div>
            <Layout style={{ alignItems: "center", background: "#49505730", paddingTop: "30px" }}>

                <Content style={{ marginLeft: "15px" }}>
                    {/* <LinearProgress indeterminate /> */}
                    <Form onFinish={attemptLogin}
                        layout={"inline"}
                        style={{ color: "white" }}
                    >
                        <Form.Item label="Username ::" >
                            <Input style={{ width: "300px" }} prefix={<BulbTwoTone />} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Password ::">
                            <Input.Password style={{ width: "300px" }} prefix={<UnlockTwoTone />} onChange={(e) => setpassword(e.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            <_Button
                                type="primary"
                                submit
                                icon={<ImportOutlined />}
                                loading={loading}
                                label="Login"
                            > Login </_Button>
                        </Form.Item>
                    </Form>
                    <br />
                </Content>
            </Layout>
            <br />
            <p style={{ textAlign: "center" }}> Copyright ©2021 FHDev@team.com All Rights Reserved </p>

        </div>

    )
}

export default AttemptAuth
