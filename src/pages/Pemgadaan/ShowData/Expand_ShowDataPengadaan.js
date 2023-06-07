import React, { useEffect, useState } from 'react'
import _MainLayouts from '../../../layouts/_MainLayouts'
import _Api from '../../../services/Api/_Api'
import { _Button, _Input, _Select } from '../../../services/Forms/Forms'

import { Table, List, Avatar, Button, Skeleton, Steps, Image, Tabs, Form, Breadcrumb, Tag, Spin, Popconfirm, Popover, Checkbox } from 'antd';
import { RandomText } from '../../../services/Text/RandomText';
import { DeleteOutlined, DownloadOutlined, EditOutlined, FundViewOutlined, HighlightOutlined, MenuOutlined, MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { _Col, _Row } from '../../../services/Forms/LayoutBootstrap';
import PreviewPDF from '../../PDF/PreviewPDF';

import pdf from "./../../../assets/img/pdf.png"
import img from "./../../../assets/img/image.png"

import excel from "./../../../assets/img/excel.png"
import word from "./../../../assets/img/word.png"
import power from "./../../../assets/img/power.png"
import document from "./../../../assets/img/document.png"
import { baseURL_http, baseURL_R, baseURL_R_file } from '../../../services/Api/BaseUrl';
import UploadLagi from './UploadLagi';


function ExpandShowDataPengadaan(pr) {

    const { data } = pr;
    const [list, setlist] = useState([])

    const [showFile, setshowFile] = useState(false)
    const [uploadL, setuploadL] = useState(false)
    const [src, setsrc] = useState("")
    const [idd, setidd] = useState(null)

    const showFileData = (j) => {
        setshowFile(true)
        var ss = baseURL_R_file + j.filename + "." + j.ext
        setsrc(ss)
    }

    const loadData = () => {
        _Api.get("arsip-getdetailRegister?id_dokumen=" + data.id).then(res => {
            setlist(res.data.data)
            setidd(null)
        })
    }


    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        _Api.get("arsip-getdetailRegister?id_dokumen=" + data.id).then(res => {
            setlist(res.data.data)
        })
    }, [])

    const deleteFile = (fn, ext, id) => {
        setidd(id)
        _Api.delete("deleteUpload?filename=" + fn + "&ext=" + ext).then(res => {
            // setlist(res.data.data)
            loadData()
        })
    }


    const closePreview = () => {
        setshowFile(false)
        setsrc(null)
    }

    const uploadLagi = () => {
        // console.log(`item`, data)
        setuploadL(true)
    }



    const stile = {
        merah: { background: "red", padding: "5px", color: "white" },
    }
    return (
        <div>
            {/* <_Row style={{ marginBottom: "5px" }}>
                <_Col sm={3} style={stile.merah}>  <b>  &nbsp; Urian Kegiatan </b> </_Col>
                <_Col sm={4} style={stile.merah}> <b> Lampiran </b> </_Col>
                <_Col sm={3} style={stile.merah}> <b> Action </b> </_Col>
            </_Row> */}

            <div style={{ marginBottom: "5px", display: "flex", minWidth: "600px" }} >
                <_Col sm={3} style={stile.merah}>  <b>  &nbsp; Urian Kegiatan </b> </_Col>
                <_Col sm={4} style={stile.merah}> <b> Lampiran </b> </_Col>
                <_Col sm={3} style={stile.merah}> <b> Action </b> </_Col>
            </div>

            {uploadL && <UploadLagi show={uploadL} onclose={() => setuploadL(false)} loadData={loadData} loadDataHead={pr.loadData} recordData={data} />}

            {list.length > 0 ?
                list.map((item, i) => {
                    return (
                        <div key={i}  >
                            {i > 0 && <hr style={{ margin: "5px" }} />}
                            <_Row style={{ marginBottom: "-2px" }}>
                                {/* <_Col sm={1} /> */}
                                <_Col sm={3}> <b style={{ color: "rgb(143 53 11)" }}> {i + 1} . {item.registerpengadaan.toUpperCase()} </b> </_Col>
                                <_Col sm={7}>

                                    <_Row>
                                        {item.detail.map((j, ii) => {
                                            return (
                                                <div style={{ padding: "5px", background: "rgb(255 195 166)", marginBottom: "2px" }} key={ii}>
                                                    <_Row className="lampiran">
                                                        <_Col sm={1} >
                                                            <Image width={30}
                                                                src={
                                                                    j.ext == "pdf" ? pdf
                                                                        : j.ext == "xls" ? excel
                                                                            : j.ext == "xlsx" ? excel
                                                                                : j.ext == "doc" ? word
                                                                                    : j.ext == "docx" ? word
                                                                                        : j.ext == "ppt" ? power
                                                                                            : j.ext == "pptx" ? power
                                                                                                : j.ext == "jpg" ? img
                                                                                                    : j.ext == "jpeg" ? img
                                                                                                        : j.ext == "png" ? img
                                                                                                            : document}
                                                                preview={false} />
                                                        </_Col>
                                                        <_Col onClick={() => showFileData(j)} sm={6} key={ii} style={{ marginTop: "26px", cursor: "pointer" }}>   {ii + 1}. {j.deskripsi}  </_Col>
                                                        <_Col sm={3} key={ii} style={{ marginTop: "26px" }}>
                                                            <Checkbox > &nbsp; </Checkbox>
                                                            <Popover placement="bottom" content={<div> Preview </div>}>
                                                                <Button type="primary" onClick={() => showFileData(j)} icon={<FundViewOutlined />} /> | &nbsp;
                                                            </Popover>
                                                            <Popconfirm
                                                                title="Hapus lampiran .!??"
                                                                onConfirm={() => deleteFile(j.filename, j.ext, j.id)}
                                                                okText="Ya, Hapus"
                                                                cancelText="Enggak"
                                                            >
                                                                <Popover placement="bottom" content={<div> Hapus </div>}>
                                                                    <Button loading={j.id == idd ? true : false} type="primary" danger icon={<DeleteOutlined />} /> 
                                                                </Popover>

                                                            </Popconfirm>
                                                            {/* <Popover placement="bottom" content={<div> Edit </div>}>
                                                                <Button type="primary" shape="shape" icon={<EditOutlined />} />
                                                            </Popover> */}
                                                        </_Col>
                                                    </_Row>
                                                </div>
                                            )
                                        })}

                                    </_Row>
                                </_Col>
                            </_Row>
                        </div>
                    )
                })
                :
                <Spin style={{ padding: "20px" }}> Mohon Tunggu </Spin>
            }

            {list.length > 0 && <PreviewPDF showFile={showFile} close={closePreview} src={src} />}
            <br />
            <p style={{ textAlign: "center" }}> <_Button onClick={uploadLagi} sm={3} block label="Upload Lagi" /> </p>
            <br />
        </div>
    )
}

export default ExpandShowDataPengadaan
