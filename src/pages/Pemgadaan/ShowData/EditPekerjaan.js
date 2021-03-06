import React, { useEffect, useState } from 'react'
import { Modal, Form, Popover, Button, Tag, Radio, Spin } from 'antd';
import _Api from '../../../services/Api/_Api';
import { _Button, _Input, _Number, _RadioGroup, _Select } from '../../../services/Forms/Forms';
import { _Row } from '../../../services/Forms/LayoutBootstrap';
import { _Toastr } from '../../../services/Toastr/Notify/_Toastr';

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
            jenispekerjaan: recordData.id_jenispekerjaan,
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
                        <_Input label="Nama Pekerjaan" name="namapekerjaan" required />
                        <_Number format label="Tahun Anggaran (TA)" name="tahunanggaran" required />
                        <_Select label="PPK" name="id_ppk" option={ppk} val="id" caption="namapegawai" required />
                        <_Select label="Jenis Pekerjaan" name="jenispekerjaan" option={jenisPekerjaan} val="id" caption="jenispekerjaan" required />

                        {/* <_Select  option={jenisPekerjaan} required
                            val="id" name="jenispekerjaan"
                        caption="jenispekerjaan" label="Jenis Pekerjaan" /> */}

                        <Form.Item label="Jenis" name="jenis"
                            rules={[
                                {
                                    required: true,
                                    message: 'Masukkan jenis ',
                                },
                            ]}>
                            <Radio.Group >
                                <Radio value={"NonTender"}>Non Tender</Radio>
                                <Radio value={"Tender"}>Tender</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <_Number format label="Nilai Kontrak" name="nilaikontrak" required />
                        <_Number format label="HPS" name="hps" required />
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
