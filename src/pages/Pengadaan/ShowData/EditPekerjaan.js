import React, { useEffect, useState } from 'react'
import { Modal, Form, Popover, Button, Tag, Radio, Spin } from 'antd';
import _Api from '../../../services/Api/_Api';
import { _Button, _Input, _Number, _RadioGroup, _Select } from '../../../services/Forms/Forms';
import { _Row } from '../../../services/Forms/LayoutBootstrap';
import { _Toastr } from '../../../services/Toastr/Notify/_Toastr';
import { Col } from 'react-bootstrap';

function EditPekerjaan(pr) {

    const [loading, setloading] = useState(false)
    const [ppk, setppk] = useState([])
    const [jenisPekerjaan, setjenisPekerjaan] = useState([])
    const [jenisTender, setjenisTender] = useState([])

    const { recordData } = pr
    const [formData] = Form.useForm()

    const loadCombo = (val) => {
        setloading(true)
        formData.setFieldsValue({
            ...recordData,
            jenispekerjaan: recordData.id_jenispekerjaan,
        })
        _Api.post("getMasterData", { "masterData": "pegawai_m", ...val }).then(res => {
            setppk(res.data)
        })

        _Api.post("getMasterData", { "masterData": "arsip_jenispekerjaan_m" }).then(res => {
            setjenisPekerjaan(res.data)
            setloading(false)
        })

        _Api.post("getMasterData", { "masterData": "metodepemilihan_m" }).then(res => {
            setjenisTender(res.data)
        })
    }


    useEffect(() => {
        loadCombo()
        console.log(`pr.data`, recordData)
    }, [])

    const simpanData = (val) => {
        var obj = {
            id: recordData.id,
            ...val,
        }

        console.log(`obj`, obj)
        setloading(true)
        _Api.post("simpanDataBerkas", obj).then(res => {
            if (res.data.sts == "1") {
                pr.loadData()
                _Toastr.success("Suksess .!")
                setloading(false)


            }
            else {
                _Toastr.error("Gagal simpan data .! .!")
                setloading(false)

            }

        })



    }


    const sumberDana = [
        { val: "APBD", caption: "APBD" },
        { val: "BLUD", caption: "BLUD" },
    ]

    return (
        <div>
            <Modal
                visible={pr.show}
                title="Edit Pekerjaan"
                // onOk={this.handleOk}
                // onCancel={this.handleCancel}
                footer={[]} >
                <Spin spinning={false}>

                    <Form layout="vertical" form={formData} onFinish={simpanData}>
                        {/* <_Input label="Nama Pekerjaan" onChange={e => console.log(e.target.value)} /> */}
                        <_Select label="Sumber Dana" name="sumberdana" option={sumberDana} val="val" caption="caption" required />
                        <_Input label="Nama Pekerjaan" name="namapekerjaan" required />
                        <_Number label="Tahun Anggaran (TA)" name="tahunanggaran" required />
                        <_Select label="PPK" name="id_ppk" option={ppk} val="id" caption="namapegawai" required />
                        <_Select label="Jenis Pekerjaan" name="jenispekerjaan" option={jenisPekerjaan} val="id" caption="jenispekerjaan" required />
                        {/* 
                            <Col sm={12}>
                                <label> Cara Pembelian : &nbsp; </label>
                                <Form.Item name="carapembelian">
                                    <Radio.Group>
                                        <Radio value={"langsung"}>Langsung</Radio>
                                        <Radio value={"tidak langsung"}>Tidak Langsung</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>  
                            <_Select  option={jenisPekerjaan} required
                                val="id" name="jenispekerjaan"
                            caption="jenispekerjaan" label="Jenis Pekerjaan" /> 
                        */}

                        {/* <Form.Item label="Jenis" name="jenis"
                            rules={[
                                {
                                    required: true,
                                    message: 'Masukkan jenis ',
                                },
                            ]}>
                            <Radio.Group >
                                <Radio value={"Non Tender"}>Non Tender</Radio>
                                <Radio value={"Tender"}>Tender</Radio>
                                <Radio value={"eCatalog"}>E-Catalog</Radio>
                            </Radio.Group>
                        </Form.Item> */}

                        <_Select size="large" option={jenisTender}
                            val="metode"  name="jenis"
                            caption="metode" label="Metode Pemilihan Penyedia :" />

                        <_Number format label="Nilai Kontrak" name="nilaikontrak" required />
                        {/* <_Number format label="HPS" name="hps" required /> */}
                        <hr />
                        <_Row>
                            <_Button sm={6} block label="Simpan" submit btnSave loading={loading} />
                            <_Button sm={5} block label="Batal" cancel onClick={pr.close} />
                        </_Row>

                    </Form>
                </Spin>
            </Modal>
        </div >
    )
}

export default EditPekerjaan
