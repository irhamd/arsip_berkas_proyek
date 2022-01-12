import React, { useEffect, useState } from 'react'
import _MainLayouts from '../../../layouts/_MainLayouts'
import _Api from '../../../services/Api/_Api'
import { _Button, _Checkbox, _Input, _Select } from '../../../services/Forms/Forms'

import { Table, Form, Popover, Button, Tag } from 'antd';
import { RandomText } from '../../../services/Text/RandomText';
import { DownSquareOutlined, DropboxOutlined, EditOutlined, FileSearchOutlined, MinusSquareOutlined, PlusSquareOutlined, RightSquareOutlined } from '@ant-design/icons';
import { _Col, _Row } from '../../../services/Forms/LayoutBootstrap';
import ExpandShowDataPengadaan from './Expand_ShowDataPengadaan';
import moment from 'moment';
import { useHistory } from 'react-router';
import EditPekerjaan from './EditPekerjaan';
import { formatNumber } from '../../../services/Text/GlobalText';


function ShowDataPengadaan() {

    const [steps, setsteps] = useState(0)
    const [jenisPekerjaan, setjenisPekerjaan] = useState([])
    const [listPekerjaan, setlistPekerjaan] = useState([])
    const [ppk, setppk] = useState([])
    const [loading, setloading] = useState(false)
    const [jenispk, setjenispk] = useState("")
    const [edit, setedit] = useState(false)
    const [recordData, setrecordData] = useState([])


    var histori = useHistory()

    // const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);


    const editData = (rc) => {
        setedit(true)
        setrecordData(rc)
    }


    const columns = [
        {
            title: '',
            width: "50px",
            sorter: true,
            render: (record, i, j) =>
                <div style={{ textAlign: "center" }}>
                    <Popover placement="bottom" content={<div> Edit </div>}>
                        <Button type="primary" shape="shape" icon={<EditOutlined />} onClick={() => editData(record)} />
                    </Popover>
                </div>

        },
        {
            title: 'No',
            width: "70px",
            sorter: true,
            render: (record, i, j) =>
                <div style={{ textAlign: "center" }}>
                    {j + 1}
                </div>

        },


        // {
        //     title: 'Rentan Waktu',
        //     width: "200px",
        //     sorter: true,
        //     render: (record, i, j) =>
        //         <div style={{ textAlign: "center" }}>
        //             {moment(record.created_at).fromNow()}
        //         </div>

        // },

        {
            title: 'Metode Pengadaan',
            sorter: true,
            width: "140px",
            render: (_, rc) =>
                <div> <Tag color={rc.jenis == "Tender" ? "green" : "blue"}>  <b>  {rc.jenis} </b> </Tag> </div>
        },
        {
            title: 'Jenis Pekerjaan',
            sorter: true,
            width: "300px",
            render: (_, rc) =>
                <div>
                    <b> {rc.jenispekerjaan} </b>
                </div>
        },
        {
            title: 'Nama Pekerjaan',
            sorter: true,
            width: "400px",

            render: (_, rc) =>
                <div>
                    <b> {rc.namapekerjaan} </b>
                </div>
        },
        {
            title: 'Nama PPK',
            width: "300px",
            sorter: true,
            render: (_, rc) =>
                <div>
                    <b> {rc.namappk} </b>
                </div>
        },

        {
            title: 'Tahun Anggaran',
            sorter: true,
            width: "100px",
            render: (rc, i, j) =>
                <div>
                    {rc.tahunanggaran}
                </div>
        },
        {
            title: 'Harga Perkiraan Sendiri (HPS)',
            sorter: true,
            width: "200px",
            render: (rc, i, j) =>
                <div style={{ float: "right" }}>
                    {rc.hps && formatNumber(parseInt(rc.hps))}

                    {/* {formatNumber(rc.hps && parseInt(rc.hps))} */}
                </div>
        },
        {
            title: 'Nilai Kontrak',
            sorter: true,
            width: "200px",
            render: (rc, i, j) =>
                <div style={{ float: "right" }}>
                    {/* { rc.nilaikontrak } */}
                    {rc.nilaikontrak && formatNumber(parseInt(rc.nilaikontrak))}

                </div>
        },
        // {
        //     title: 'Tanggal Input',
        //     width: "200px",
        //     sorter: true,
        //     render: (record, i, j) =>
        //         <div style={{ textAlign: "center" }}>
        //             {moment(record.created_at).format("DD-MM-YYYY HH:mm")}
        //         </div>

        // },

    ];

    const stile = {
        icon: { fontSize: "25px", color: "orange" }
    }

    const loadData = (val) => {
        setlistPekerjaan([])
        setedit(false)
        setloading(true)
        _Api.get("arsip-showBerkasArsip", { params: val }).then(res => {
            setlistPekerjaan(res.data.data)
            setloading(false)
        })
    }

    const loadCombo = (val) => {
        setloading(true)
        _Api.post("getMasterData", { "masterData": "pegawai_m", ...val }).then(res => {
            setppk(res.data)
        })

        _Api.post("getMasterData", { "masterData": "arsip_jenispekerjaan_m" }).then(res => {
            setjenisPekerjaan(res.data)
        })
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

                <_Input label="Nama Pekerjaan" name="namappekerjaan" />
                <_Select size="large" option={jenisPekerjaan}
                    val="id" name="jenispekerjaan"
                    caption="jenispekerjaan" label="Jenis Pekerjaan" />
                <_Input label="Tahun Anggaran (TA)" name="tahunanggaran" />
                <_Select label="PPK" option={ppk} val="id" caption="namapegawai" name="id_ppk" />
                <_Row>
                    <_Col sm={5} />
                    <_Button label="Cari Data" icon={<FileSearchOutlined />} sm={2} block submit />
                    <_Button label="Pekerjaan Baru" icon={<DropboxOutlined />} onClick={() => histori.push("/DataArsip")} color="green" sm={2} block />
                </_Row>
            </Form>

            {edit && <EditPekerjaan show={edit} close={() => setedit(false)} loadData={loadData} recordData={recordData} />}
            <br />

            <Table size="large"
                rowKey="id"
                loading={loading}
                expandable={{
                    expandedRowRender: record =>
                        <p style={{ margin: 0 }}>
                            <_Col style={{ background: "#ffd3bd", padding: " 2px 10px" }}>
                                <ExpandShowDataPengadaan loadData={loadData} data={record} />


                            </_Col>
                        </p>,
                    expandIcon: ({ expanded, onExpand, record }) =>
                        expanded ? (
                            <MinusSquareOutlined style={stile.icon} onClick={e => onExpand(record, e)} />
                        ) : (
                            < PlusSquareOutlined style={stile.icon} onClick={e => onExpand(record, e)} />
                        )
                }}
                scroll={{ y: 700 }}
                pagination={{ pageSize: 30 }}
                columns={columns} dataSource={listPekerjaan} />
            <br />

        </_MainLayouts>
    )
}

export default ShowDataPengadaan
