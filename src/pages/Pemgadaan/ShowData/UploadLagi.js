import React, { useEffect, useState } from 'react'
import { Modal, Form, Popover, Button, Tag, Radio, Spin, Upload, Progress, Divider } from 'antd';
import _Api from '../../../services/Api/_Api';
import { _Button, _Input, _Number, _RadioGroup, _Select } from '../../../services/Forms/Forms';
import { _Col, _Row } from '../../../services/Forms/LayoutBootstrap';
import { _Toastr } from '../../../services/Toastr/Notify/_Toastr';
import axios from 'axios';
import { baseURL_R } from '../../../services/Api/BaseUrl';
import { PlusOutlined } from '@ant-design/icons';

function UploadLagi(pr) {


    const [defaultFileList, setDefaultFileList] = useState([]);
    const [progress, setProgress] = useState(0);
    const [registerPengadaan, setregisterPengadaan] = useState([]);
    const [idRegister, setIdRegister] = useState(null);


    const { recordData } = pr
    const [formData] = Form.useForm()

    const loadCombo = (val) => {
        formData.setFieldsValue(recordData)

        _Api.post("getMasterData", { "masterData": "arsip_registerpengadaan_m" }).then(res => {
            setregisterPengadaan(res.data)

        })
    }


    useEffect(() => {
        loadCombo()
    }, [])


    const uploadImage = async options => {
        const { onSuccess, onError, file, onProgress } = options;
        try {
            const F = new FormData();
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                },
                onUploadProgress: event => {
                    const percent = Math.floor((event.loaded / event.total) * 100);
                    setProgress(percent);
                    if (percent === 100) {
                        setTimeout(() => setProgress(0), 1000);
                    }
                    onProgress({ percent: (event.loaded / event.total) * 100 });
                }
            };
            F.append("id_dokumen", recordData.id);
            F.append("fileupload", file);
            F.append("filename", file.uid);
            F.append("deskripsi", file.name);
            F.append("id_registerpengadaan", idRegister);


            await axios.post(
                `${baseURL_R}testUpload`, F, config
            );

            // console.log(`options`, options)

            onSuccess("Ok");
        } catch (err) {
            // console.log("Eroor: ", err);
            const error = new Error("Some error");
            onError({ err });
        }
    };

    const handleOnChange = ({ file, fileList, event }) => {
        // console.log(file, fileList, event);
        //Using Hooks to update the state to the current filelist
        setDefaultFileList(fileList);
        //filelist - [{uid: "-1",url:'Some url to image'}]
    };

    const onRemove = ({ file, fileList, event }) => {
        // console.log(`file`, file)
        //    _Api.delete("deleteUpload?filename="+ file.name ).then({})
    };


    const uploadButton = (
        <div>
            <PlusOutlined />
            <div>Upload</div>
        </div>
    );





    return (
        <div>
            <Modal
                visible={pr.show}
                width={800}
                title="Upload Lagi"
                // onOk={this.handleOk}
                // onCancel={pr.onclose}
                footer={[]} >
                <Spin spinning={false}>

                    <Form layout="vertical" form={formData}>
                        {/* <_Input label="Nama Pekerjaan" onChange={e => console.log(e.target.value)} /> */}
                        <_Input disabled label="Nama Pekerjaan" name="namapekerjaan" required />
                        <_Input disabled label="Jenis Pekerjaan" name="jenispekerjaan" required />
                        <_Input disabled label="Jenis Pengadaan" name="jenis" required />
                        <_Input disabled label="Nama PPK" name="namappk" required />


                        <_Select size="large" option={registerPengadaan}
                            onChange={() => setDefaultFileList(null)}
                            val="id" name="registerpengadaan" onChange={e => setIdRegister(e)}
                            caption="registerpengadaan" label="Register Pengadaan" />

                        <Divider orientation="left">Upload File</Divider>

                        <Upload
                            accept="image/*,.doc,.docx,.xlsx,.xls,.pdf,.ppt,.pptx"
                            customRequest={uploadImage}
                            onChange={handleOnChange}
                            onRemove={onRemove}
                            listType="picture"
                            multiple
                            fileList={defaultFileList}
                        >
                            {uploadButton}
                            {/* <_Button label="Upload Berkas" icon={<DiffOutlined size="large" />} /> */}
                        </Upload>
                        {progress > 0 ? <Progress percent={progress} /> : null}

                        <br />
                        <_Row>

                            <_Col sm={8} />
                            <_Button label="Tutup" sm={4} block btnSave onClick={() => {
                                pr.loadDataHead()
                                // pr.onclose
                            }
                            }
                            />
                        </_Row>

                    </Form>
                </Spin>
            </Modal>
        </div >
    )
}

export default UploadLagi
