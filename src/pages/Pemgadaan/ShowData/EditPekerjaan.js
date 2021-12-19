import React, { useEffect, useState } from 'react'
import { Modal, Form, Popover, Button, Tag, Radio, Spin } from 'antd';
import _Api from '../../../services/Api/_Api';
import { _Button, _Input, _RadioGroup, _Select } from '../../../services/Forms/Forms';
import { _Row } from '../../../services/Forms/LayoutBootstrap';

function EditPekerjaan(pr) {

    const [loading, setloading] = useState(false)
    const [ppk, setppk] = useState([])
    const [jenisPekerjaan, setjenisPekerjaan] = useState([])

    const { recordData } = pr
    const [formData] = Form.useForm()

    const loadCombo = (val) => {
        setloading(true)
        formData.setFieldsValue({
            ...recordData,
            tahunanggaran: recordData.tahunanggaran.toString(),
        })
        _Api.post("getMasterData", { "masterData": "pegawai_m", ...val }).then(res => {
            setppk(res.data)
        })

        _Api.post("getMasterData", { "masterData": "arsip_jenispekerjaan_m" }).then(res => {
            setjenisPekerjaan(res.data)
            setloading(false)

        })
    }


    useEffect(() => {
        loadCombo()
        console.log(`pr.data`, recordData)
    }, [])

    const simpanData = (val) => {
        var obj = {
            ...recordData,
            ...val,
            // id_ppk : 
        }
        console.log(`val`, obj,)
    }



    return (
        <div>
            <Modal
                visible={pr.show}
                title="Edit Pekerjaan"
                // onOk={this.handleOk}
                // onCancel={this.handleCancel}
                footer={[]} >
                <Spin spinning={loading}>

                    <Form layout="vertical" form={formData} onFinish={simpanData}>
                        {/* <_Input label="Nama Pekerjaan" onChange={e => console.log(e.target.value)} /> */}
                        <_Input label="Nama Pekerjaan" name="namapekerjaan" required />
                        <_Input label="Tahun Anggaran (TA)" name="tahunanggaran" required />
                        <_Select label="PPK" name="id_ppk" option={ppk} val="id" caption="namapegawai" required />
                        <_Select size="large" option={jenisPekerjaan} required
                            val="id" name="id_jenispekerjaan"
                            caption="jenispekerjaan" label="Jenis Pekerjaan" />

                        <Form.Item label="Jenis" name="jenis"
                            rules={[
                                {
                                    required: true,
                                    message: 'Masukkan jenis ',
                                },
                            ]}
                        >
                            <Radio.Group >
                                <Radio value={"NonTender"}>Non Tender</Radio>
                                <Radio value={"Tender"}>Tender</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <hr />
                        <_Row>
                            <_Button sm={6} block label="Simpan" submit btnSave />
                            <_Button sm={5} block label="Batal" cancel onClick={pr.close} />
                        </_Row>

                    </Form>
                </Spin>
            </Modal>
        </div >
    )
}

export default EditPekerjaan
