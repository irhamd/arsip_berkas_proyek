import React, { useEffect, useState } from 'react'
import { Table, List, Avatar, Button, Skeleton, Steps, Space, Tabs, Form, Breadcrumb, Tag, Radio } from 'antd';
import _MainLayouts from '../../layouts/_MainLayouts';
import _Api from '../../services/Api/_Api';
import ExpandArsip from './ExpandArsip';
import { _Button, _Input, _Number, _Select } from '../../services/Forms/Forms';
import { Col, Nav, Row } from 'react-bootstrap';
import _Nav from '../../layouts/_Nav';
import UploadBerkas from './Upload/UploadBerkas';
import RenderSteps from './Steps/Steps';
import { _Row } from '../../services/Forms/LayoutBootstrap';
import { DoubleLeftOutlined, DoubleRightOutlined, DownloadOutlined } from '@ant-design/icons';
import { RandomText } from '../../services/Text/RandomText';
import { _Toastr } from '../../services/Toastr/Notify/_Toastr';
import { cekRefresh } from '../../services/Text/CekRefresh';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
var randomstring = require("randomstring");


function DataArsip() {



    const [dataArsip, setdataArsip] = useState([])


    const [steps, setsteps] = useState(0)
    const [jenisPekerjaan, setjenisPekerjaan] = useState([])
    const [registerpengadaan, setregisterpengadaan] = useState([])
    const [ppk, setppk] = useState([])
    const [jenispk, setjenispk] = useState("")
    const [isiForm, setisiForm] = useState({})
    const [arr, setarr] = useState([])
    const [random, setrandom] = useState("")
    const [jenisTender, setjenisTender] = useState([])
    const [sumberDana, setsumberDana] = useState([])

    const history = useHistory();


    const change = (field, isi) => {
        setisiForm({
            id: random,
            ...isiForm,
            [field]: isi
        })
    }


    const loadData = () => {
        _Api.get("arsip-getBerkas").then(res => {
            setdataArsip(res.data.data)
        })

        _Api.get("arsip-getBerkas").then(res => {
            setdataArsip(res.data.data)
        })

        _Api.post("getMasterData", { "masterData": "arsip_jenispekerjaan_m" }).then(res => {
            setjenisPekerjaan(res.data)
        })
        _Api.post("getMasterData", { "masterData": "arsip_registerpengadaan_m" }).then(res => {
            setregisterpengadaan(res.data)

        })
        _Api.post("getMasterData", { "masterData": "pegawai_m" }).then(res => {
            setppk(res.data)

        })
        _Api.post("getMasterData", { "masterData": "metodepemilihan_m" }).then(res => {
            setjenisTender(res.data)

        })
        _Api.post("getMasterData", { "masterData": "sumberdana_m" }).then(res => {
            setsumberDana(res.data)

        })
    }



    const columns = [

        {
            title: 'No',
            width: "100px",
            sorter: true,
            render: (record, i, j) =>
                <div style={{ textAlign: "center" }}>
                    {j + 1}
                </div>

        },
        {
            title: 'Uraian Kegiatan',
            width: "400px",
            sorter: (a, b) => a.registerpengadaan - b.registerpengadaan,
            render: (_, rc) =>
                <div style={{ float: "right", paddingRight: "20px" }}>
                    <b style={{ fontSize: "17px", color: "#752c0a" }}> {rc.registerpengadaan} </b>
                </div>
        },
        {
            title: 'Upload File',
            sorter: true,
            width: "500px",
            render: (record, i, j) =>
                <div>
                    <UploadBerkas iddata={random} id_reg={record.id} />

                </div>
        },
        {
            title: 'isUpload',
            sorter: true,
            width: "100px",
            render: (record, i, j) =>
                <div>
                    <Tag size="large" color="blue" > UPLOAD </Tag>
                </div>
        },
        {
            title: 'Catatan',
            width: "400px",
            sorter: true,
            render: (record, i, j) =>
                <div >
                    <_Input multiline onChange={(e) => {
                        setarr({ ...arr, id: record.id, ket: e })
                    }} />
                </div>

        },

    ];



    const simpanArsip = () => {
        _Api.post("simpanDataBerkas", isiForm).then(res => {
            // console.log(`res.data`, res.data)
            if (res.data.sts == "1") {

                _Toastr.success("Suksess .!")
                setisiForm({})
                history.push("/ShowDataPengadaan")
            }
            else
                _Toastr.error("Gagal simpan data .! .!")

        })
    }


    useEffect(() => {
        loadData()
        setrandom(randomstring.generate(10) + moment().format('YYYYMMDDHHmmss'))
        // cekRefresh()
    }, [])



    const lanjut = () => {
        setsteps(steps + 1)
    }
    const mundur = () => {
        setsteps(steps - 1)
    }

    // const jenisTender = [
    //     { val: "Tender", caption: "Tender" },
    //     { val: "Non Tender", caption: "Non Tender" },
    //     { val: "eCatalog", caption: "E-Catalog" },
    // ]

    // const sumberDana = [
    //     { val: "APBD", caption: "APBD" },
    //     { val: "BLUD", caption: "BLUD" },
    // ]

    const changejenisPekerjaan = (e, f) => {
        change("jenispekerjaan", e)
        setjenispk(f.children[1])
    }



    const { TabPane } = Tabs;
    const { Item } = Breadcrumb;

    const [ii, setii] = useState(0)

    return (
        <_MainLayouts>

            {/* <_Button label="add" /> */}


            <Breadcrumb style={{ margin: '16px 0' }}>
                <Item>{isiForm && isiForm.id}</Item>
                <Item>{isiForm && isiForm.jenis}</Item>
                <Item>{jenispk}</Item>
            </Breadcrumb>

            <RenderSteps steps={steps} />
            <br />
            <Tabs activeKey={`${steps + 1}`} tabBarStyle={{ height: "1px" }} tabPosition="bottom">
                <TabPane key="1">
                    <Row>
                        <_Select size="large" option={sumberDana}
                            val="sumberdana"
                            onSelect={e => change("sumberdana", e)}
                            caption="sumberdana" label="Sumber Dana" sm={6} />
                        <_Select size="large" option={jenisTender}
                            val="metode" sm={6}
                            onSelect={e => change("jenis", e)}
                            caption="metode" label="Metode Pemilihan Penyedia :" />
                    </Row>

                </TabPane>
                <TabPane key="2">
                    <Row>
                        <_Select sm={5} size="large" option={jenisPekerjaan}
                            val="id"
                            onChange={changejenisPekerjaan}
                            caption="jenispekerjaan" label="Jenis Pekerjaan" />
                        {/* <Col sm={4}>
                            <label> Cara Pembelian  : &nbsp; </label>
                            <Radio.Group onChange={e=>change('carapembelian', e.target.value) }>
                                <Radio value={"langsung"}>Langsung</Radio>
                                <Radio value={"tidak langsung"}>Tidak Langsung</Radio>
                            </Radio.Group>
                        </Col> */}
                    </Row>
                </TabPane>
                <TabPane key="3">
                    <Form labelCol={{ span: "8" }} wrapperCol={{ span: "10" }}>
                        {/* <_Input label="Nama Pekerjaan" onChange={e => console.log(e.target.value)} /> */}
                        <_Input label="Nama Pekerjaan" onChange={e => change("namapekerjaan", e.target.value)} required />
                        <_Input label="Tahun Anggaran (TA)" onChange={e => change("tahunanggaran", e.target.value)} required />
                        <_Select label="PPK" onSelect={e => change("id_ppk", e)} option={ppk} val="id" caption="namapegawai" required />
                        {/* <_Number label="HPS (Harga Perkiraan Sendiri)" onChange={e => change("hps", e)} format required /> */}
                        <_Number label="Nilai Kontrak" onChange={e => change("nilaikontrak", e)} format required />
                        {/* <_Select label="" onSelect={e => change("hps", e)} option={ppk} val="id" caption="namapegawai" required /> */}
                    </Form>
                    {/* register pengadaan */}
                    <Table size="large" scroll={{ y: 700 }} pagination={{ pageSize: 30 }}
                        columns={columns}
                        dataSource={registerpengadaan} />
                </TabPane>
                <TabPane key="4">

                    {/* Content of Tab Pane 4 */}
                </TabPane>
                <TabPane key="5">
                    {/* Content of Tab Pane 5 */}
                </TabPane>
            </Tabs>
            <div style={{ display: "flex", marginTop: "20px" }}>
                <_Button label="Mundur" icon={<DoubleLeftOutlined />} disabled={steps == 0} sm={1} block onClick={mundur} /> &nbsp;
                {steps == 3 ?
                    <_Button label="Simpan Ke Database" icon={<DownloadOutlined />} onClick={simpanArsip} sm={3} block /> :
                    <_Button label="Lanjut" icon={<DoubleRightOutlined />} disabled={steps == 4} sm={1} block onClick={lanjut} />
                }
            </div>
        </_MainLayouts>
    )
}

export default DataArsip
