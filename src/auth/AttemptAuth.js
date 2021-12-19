import React, { useEffect, useState } from 'react'
import { Form, Input} from 'antd';
import { BulbTwoTone, UnlockTwoTone,ImportOutlined } from '@ant-design/icons';
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
import _MainLayouts from '../layouts/_MainLayouts';

import logo from "./../assets/img/file2.png"


function AttemptAuth() {

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
                name: username,
                password: password
            }

            axios.post(`${baseURL_R}loginRev`, obj).then(res => {
                const data = res.data;
                console.log(res.data)

                if (data) {
                    let user = JSON.stringify(res.data);
                    sessionStorage.setItem(globalText.x_auth_resu, acakText(user))
                    sessionStorage.setItem(globalText.x_auth_user, acakText("!@#$%^&*()_+"))
                    sessionStorage.setItem(globalText.x_auth_access_token, acakText(data.token))
                    sessionStorage.setItem(globalText.x_auth_refresh_token, acakText(data.refresh_token))
                    sessionStorage.setItem(globalText.authorization, acakText(data.role))
                    // sessionStorage.setItem('token', data.token)
                    window.location.href = "/ShowDataPengadaan";
                    // histori.push("ShowDataPengadaan")
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
        <_MainLayouts >
            <div style={{ width: "100%", padding: "0px 10%" }}>
                <h1 style={{ textAlign: "center", marginTop: "8%" }}></h1>
                <div style={{ textAlign: "center" }}>
                    <p><img width="300" src={logo} alt="" /></p>
                    <p style={{ textAlign: "center", fontWeight: "bolder", fontSize :"20px" }}> <span style={{ color: "#ff4d4f" }}>
                        ARSIP ONLINE </span>  BERKAS PROYEK  </p>

                    {/* <b> Silahkan Login </b> */}
                </div>
                <Layout style={{ alignItems: "center", borderRadius: "0px 25px", background: "#49505730", paddingTop: "30px" }}>

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

            </div>
        </_MainLayouts>

    )
}

export default AttemptAuth
