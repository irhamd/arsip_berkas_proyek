import React, { useEffect, useState } from 'react'
import _MainLayouts from '../../../layouts/_MainLayouts'
import _Api from '../../../services/Api/_Api'
import { _Button, _Input, _Select } from '../../../services/Forms/Forms'

import { Table, List, Avatar, Button, Skeleton, Steps, Space, Tabs, Form, Breadcrumb, Tag } from 'antd';
import { RandomText } from '../../../services/Text/RandomText';
import { DownloadOutlined, MenuOutlined, MinusCircleTwoTone, MinusSquareOutlined, PlusCircleTwoTone, PlusSquareOutlined } from '@ant-design/icons';
import { _Col, _Row } from '../../../services/Forms/LayoutBootstrap';
import ExpandShowDataPengadaan from './Expand_ShowDataPengadaan';


function ShowDataPengadaan() {


    const [steps, setsteps] = useState(0)
    const [jenisPekerjaan, setjenisPekerjaan] = useState([])
    const [listPekerjaan, setlistPekerjaan] = useState([])
    const [ppk, setppk] = useState([])
    const [jenispk, setjenispk] = useState("")
    const [isiForm, setisiForm] = useState({})

    var random = RandomText;

    const change = (field, isi) => {
        setisiForm({
            id: random,
            ...isiForm,
            [field]: isi
        })
    }



    // const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

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
            title: 'Jenis',
            sorter: true,
            render: (_, rc) =>
                <div> <b> {rc.jenis} </b> </div>
        },
        {
            title: 'Jenis Pekerjaan',
            sorter: true,
            render: (_, rc) =>
                <div>
                    <b> {rc.jenispekerjaan} </b>
                </div>
        },
        {
            title: 'Nama Pekerjaan',
            sorter: true,
            render: (_, rc) =>
                <div>
                    <b> {rc.namapekerjaan} </b>
                </div>
        },
        {
            title: 'Nama PPK',
            sorter: true,
            render: (_, rc) =>
                <div>
                    <b> {rc.namappk} </b>
                </div>
        },

        {
            title: 'Keterangan',
            sorter: true,
            width: "400px",
            render: (record, i, j) =>
                <div>
                </div>

        },

    ];

    const loadData = (val) => {
        _Api.get("arsip-showBerkasArsip", { params: val }).then(res => {
            setlistPekerjaan(res.data.data)
        })
    }

    const loadCombo = (val) => {
        _Api.post("getMasterData", { "masterData": "pegawai_m", ...val }).then(res => {
            setppk(res.data)
        })

        _Api.post("getMasterData", { "masterData": "arsip_jenispekerjaan_m" }).then(res => {
            setjenisPekerjaan(res.data)
        })
    }

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }


    useEffect(() => {
        loadData()
        loadCombo()


    }, [])


    return (
        <_MainLayouts>
            <br />
            <Form labelCol={{ span: "8" }} wrapperCol={{ span: "10" }} onFinish={loadData}>
                {/* <_Input label="Nama Pekerjaan" onChange={e => console.log(e.target.value)} /> */}

                <_Select size="large" option={jenisPekerjaan}
                    val="id" name="jenispekerjaan"
                    caption="jenispekerjaan" label="Jenis Pekerjaan" />


                <_Input label="Nama Pekerjaan" name="namappekerjaan" />
                <_Input label="Tahun Anggaran (TA)" name="tahunanggaran" />
                <_Select label="PPK" option={ppk} val="id" caption="namapegawai" name="id_ppk" />

                <_Row>
                    <_Col sm={6} />
                    <_Button label="Cari Data" icon={<DownloadOutlined />} sm={2} block submit />
                    <_Button label="Reset" icon={<DownloadOutlined />} sm={1} block />
                </_Row>
            </Form>

            <br />

            <Table size="large"
                rowKey="id"
                expandable={{
                    expandedRowRender: record =>
                        <p style={{ margin: 0 }}>
                            <_Col style={{ background: "#ffd3bd", padding: " 2px 10px" }}>
                                <ExpandShowDataPengadaan data={record} />
                            </_Col>
                        </p>,
                    expandIcon: ({ expanded, onExpand, record }) =>
                        expanded ? (
                            <MinusSquareOutlined onClick={e => onExpand(record, e)} />
                        ) : (
                            <PlusSquareOutlined onClick={e => onExpand(record, e)} />
                        )
                }}
                scroll={{ y: 700 }}
                pagination={{ pageSize: 30 }}
                columns={columns} dataSource={listPekerjaan}
                onChange={onChangeTable} />
            <br />

        </_MainLayouts>
    )
}

export default ShowDataPengadaan
