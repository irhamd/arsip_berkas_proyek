import React, { useEffect, useState } from 'react'
import { Upload, Progress, Space, List, Image, Button, Form, Pagination } from "antd";
import axios from 'axios';
import _MainLayouts from '../../layouts/_MainLayouts';
import _Api, { baseURL } from '../../services/Api/_Api';
import { CloudDownloadOutlined, DiffOutlined, FundViewOutlined } from '@ant-design/icons';
import { _Button, _Date, _Input, _Label, _TitleBar } from '../../services/Forms/Forms';
import { _Row } from '../../services/Forms/LayoutBootstrap';
import type from './../../assets/img/pdf.png';
import pdf from './../../assets/img/pdf.png';
import document from './../../assets/img/document.png';
import image from './../../assets/img/image.png';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { Document, Page } from 'react-pdf';
import moment from 'moment';


function ArsipBerkas() {

    const [defaultFileList, setDefaultFileList] = useState([]);
    const [progress, setProgress] = useState(0);
    const [loading, setloading] = useState(false);
    const [dataBerkas, setdataBerkas] = useState([]);

    const [newId, setnewId] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const loadData = () => {
        _Api.get("arsip-getBerkas").then(res => {
            setdataBerkas(res.data.data)
        })
    }

    const [formBerkas] = Form.useForm()

    useEffect(() => {
        loadData()
    }, [])


    const uploadImage = async options => {
        const { onSuccess, onError, file, onProgress } = options;


        var ext = file.name.split(".");
        // console.log(`ext`, ext)
        // var extension = ext[ext.length - 1];
        // return

        const fArsip = formBerkas.getFieldsValue()

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
        F.append("id_dokumen", newId);
        F.append("fileupload", file);
        F.append("filename", file.uid);
        F.append("deskripsi", file.name);
        F.append("noberkas", fArsip.noberkas);
        F.append("perihal", fArsip.perihal);
        F.append("tanggal", moment(fArsip.tanggal).format('YYYY-MM-DD'));

        ext = file.name.split(".");

        try {
            const res = await axios.post(
                `${baseURL}testUpload`,
                F,
                config
            ).then(res => {

            });

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
        console.log(`file`, file)
        //    _Api.delete("deleteUpload?filename="+ file.name ).then({})
    };



    return (
        <_MainLayouts>
            <div class="container">
                <_TitleBar align="center" title="UPLOAD BERKAS" />
                <br />
                <Form
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 14 }}
                    autoComplete="off"
                    form={formBerkas}
                >
                    <_Row>
                        <_Input name="noberkas" label="No. Berkas" />
                        <_Date label="Tanggal" name="tanggal" />
                        <_Input label="Perihal" name="perihal" />
                    </_Row>
                </Form>
                <Upload
                    // accept="all/*,.doc,.docx,.xlsx,.xls,.xml,.pdf"
                    customRequest={uploadImage}
                    style={{ height: "20px", background: "orange" }}
                    onChange={handleOnChange}
                    onRemove={onRemove}
                    listType="picture"
                    multiple
                    // fileList = {fileList}
                    className="image-upload-grid"
                >
                    {/* <div>Upload Button</div> */}
                    <div style={{ padding: "20px", background: "orange" }}> <DiffOutlined size="large" />  Upload Berkas </div>
                </Upload>
                {progress > 0 ? <Progress percent={progress} /> : null}

                <br />

                <br />
            </div>

        </_MainLayouts>
    )
}

export default ArsipBerkas
