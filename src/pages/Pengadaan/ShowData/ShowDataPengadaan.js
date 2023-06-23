import React, { useEffect, useState } from 'react'
import _MainLayouts from '../../../layouts/_MainLayouts'
import _Api from '../../../services/Api/_Api'
import { _Button, _Checkbox, _Input, _Select, _Date } from '../../../services/Forms/Forms'

import { Table, Form, Popover, Button, Tag, Popconfirm, Radio, DatePicker } from 'antd';
import { RandomText } from '../../../services/Text/RandomText';
import { DeleteColumnOutlined, DownSquareOutlined, DropboxOutlined, EditOutlined, FileSearchOutlined, MinusSquareOutlined, PlusSquareOutlined, RightSquareOutlined } from '@ant-design/icons';
import { _Col, _Row } from '../../../services/Forms/LayoutBootstrap';
import ExpandShowDataPengadaan from './Expand_ShowDataPengadaan';
import moment from 'moment';
import { useHistory } from 'react-router';
import EditPekerjaan from './EditPekerjaan';
import { formatNumber, globalText } from '../../../services/Text/GlobalText';
import { Col, Row } from 'react-bootstrap';
import { _Toastr } from '../../../services/Toastr/Notify/_Toastr';
import { ubahText } from '../../../services/Crypto';
import dayjs from 'dayjs';


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
    const hapusBerkas = (rc) => {
        console.log('rc', rc)
        _Api.delete("deleteProyek?id=" + rc.id).then(res => {
            console.log('res', res)
            if (res.data.sts == 1) {
                _Toastr.success('Berhasil')
                loadData()
            }
        })
    }


    const columns = [
        {
            title: '',
            width: "100px",
            align: 'center',
            render: (record, i, j) =>
                <div style={{ textAlign: "center", display: "flex" }}>
                    <Popover placement="bottom" content={<div> Edit </div>}>
                        <Button type="primary" shape="shape" icon={<EditOutlined />} onClick={() => editData(record)} />
                    </Popover>
                    &nbsp;
                    <Popconfirm
                        title="Anda yakin akan menghapus berkas proyek ini ? ( hati-hati ) ."
                        // description=" Anda yakin akan menhapus berkay proyek ini ?"
                        onConfirm={() => hapusBerkas(record)}
                        // onCancel={cancel}
                        okText="Ya, Hapus"
                        cancelText="Tidak"
                    >
                        <Button type="primary" danger shape="shape" icon={<DeleteColumnOutlined />} />
                    </Popconfirm>

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
        {
            title: 'Tanggal Input',
            width: "130px",
            sorter: true,
            render: (record, i, j) =>
                <div style={{ textAlign: "center" }}>
                    {record.tanggal && moment(record.tanggal).format('DD-MM-YYYY')}
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
            title: 'Metode Pemilihan Penyedia',
            sorter: true,
            width: "150px",
            render: (_, rc) =>
                <div> <Tag size="large" color={rc.jenis == "Tender" ? "green" : rc.jenis == "eCatalog" ? "orange" : "blue"}>  <b>  {rc.jenis} </b> </Tag> </div>
        },
        {
            title: 'Sumber Dana',
            sorter: true,
            width: "140px",
            render: (_, rc) =>
                <div> <div color={rc.jenis == "apbd" ? "green" : "blue"}>  <b>  {rc.sumberdana}   </b> </div> </div>
        },
        {
            title: 'Jenis Pekerjaan',
            sorter: true,
            width: "300px",
            render: (_, rc) =>
                <div>
                    <b> {rc.jenispekerjaan} <br /> <Tag color="yellow" style={{ textTransform: "uppercase" }}> {rc.bidang} </Tag> </b>
                </div>
        },
        {
            title: 'Nama Pekerjaan',
            sorter: true,
            width: "300px",

            render: (_, rc) =>
                <div>
                    <b> {rc.namapekerjaan} </b> <br />
                    <Tag color="orange"> {rc.jenisarsip} </Tag>

                </div>
        },
        {
            title: 'Nama PPK',
            width: "200px",
            sorter: true,
            render: (_, rc) =>
                <div>
                    <b> {rc.namappk} </b>
                </div>
        },

        {
            title: 'Tahun Anggaran',
            sorter: true,
            width: "120px",
            render: (rc, i, j) =>
                <div>
                    {rc.tahunanggaran}
                </div>
        },
        // {
        //     title: 'Harga Perkiraan Sendiri (HPS)',
        //     sorter: true,
        //     width: "200px",
        //     render: (rc, i, j) =>
        //         <div style={{ float: "right" }}>
        //             {rc.hps && formatNumber(parseInt(rc.hps))}

        //             {/* {formatNumber(rc.hps && parseInt(rc.hps))} */}
        //         </div>
        // },
        {
            title: 'Nilai Kontrak',
            sorter: true,
            width: "130px",
            render: (rc, i, j) =>
                <div style={{ float: "right", fontWeight: 'bold' }}>
                    {/* { rc.nilaikontrak } */}
                    Rp. {rc.nilaikontrak && formatNumber(parseInt(rc.nilaikontrak))}

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
        if (val) {
            var param = {
                ...val,
                tglawal: moment(val.tglawal).format('YYYY-MM-DD'),
                tglakhir: moment(val.tglakhir).format('YYYY-MM-DD')
            }
        } else {
            var param = val
        }
        setloading(true)
        _Api.get("arsip-showBerkasArsip", { params: param }).then(res => {
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
        var role = ubahText(sessionStorage.getItem('x-auth-user'))
        console.log('role', role)
        loadData()
        loadCombo()
    }, [])


    return (
        <_MainLayouts>
            <br />
            <Form labelCol={{ span: "8" }} wrapperCol={{ span: "10" }} onFinish={loadData}>
                {/* <_Input label="Nama Pekerjaan" onChange={e => console.log(e.target.value)} /> */}
                <_Date label="Tanggal" name="tglawal" />
                <_Date label="Sampai" name="tglakhir" />
                <_Input label="Nama Pekerjaan" name="namappekerjaan" />
                <_Select size="large" option={jenisPekerjaan}
                    val="id" name="jenispekerjaan"
                    caption="jenispekerjaan" label="Jenis Pekerjaan" />
                <_Input label="Tahun Anggaran (TA)" name="tahunanggaran" />
                {/* <Col sm={12}>
                    <label> Sumber Dana : &nbsp; </label> */}
                <Form.Item name="sumberdana" label="Sumber Dana">
                    <Radio.Group>
                        <Radio value={"apbd"}>APBD</Radio>
                        <Radio value={"blud"}>BLUD</Radio>
                        <Radio value="">Semua</Radio>
                    </Radio.Group>
                </Form.Item>
                {/* </Col> */}
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
