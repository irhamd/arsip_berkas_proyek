import React, { useEffect, useState } from 'react'
import { Upload, Progress, Space, List, Image, Button, Form, Pagination } from "antd";
import { CloudDownloadOutlined, DiffOutlined, FundViewOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import _MainLayouts from '../../../layouts/_MainLayouts';
import _Api from '../../../services/Api/_Api';
import { _Button, _Date, _Input, _Label, _TitleBar } from '../../../services/Forms/Forms';
// import { _Row } from '../../services/Forms/LayoutBootstrap';

import moment from 'moment';
import { _Row } from '../../../services/Forms/LayoutBootstrap';
import { baseURL_R } from '../../../services/Api/BaseUrl';


function UploadBerkas(pr) {

    const [defaultFileList, setDefaultFileList] = useState([]);
    const [progress, setProgress] = useState(0);
    const [loading, setloading] = useState(false);
    const [dataBerkas, setdataBerkas] = useState([]);


 

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
            F.append("id_dokumen", pr.iddata);
            F.append("fileupload", file);
            F.append("filename", file.uid);
            F.append("deskripsi", file.name);
            F.append("id_registerpengadaan", pr.id_reg);


            await axios.post(
                `${baseURL_R}testUpload`, F,config
            ).then(res => { });

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
        console.log(`file`, file)
        //    _Api.delete("deleteUpload?filename="+ file.name ).then({})
    };


    const uploadButton = (
        <div>
            <PlusOutlined />
            <div>Upload</div>
        </div>
    );


    return (
        <div class="">
            <br />
            <Upload
                accept="image/*,.doc,.docx,.xlsx,.xls,.pdf,.ppt,.pptx"
                customRequest={uploadImage}
                onChange={handleOnChange}
                onRemove={onRemove}
                listType="picture-card"
                multiple
            // fileList = {fileList}
            // className="image-upload-grid"
            >
                {uploadButton}
                {/* <_Button label="Upload Berkas" icon={<DiffOutlined size="large" />} /> */}
            </Upload>
            {progress > 0 ? <Progress percent={progress} /> : null}

            <br />

            <br />
        </div>

    )
}

export default UploadBerkas
