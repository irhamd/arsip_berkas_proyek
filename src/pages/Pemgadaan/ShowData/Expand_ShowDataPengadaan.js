import React, { useEffect, useState } from 'react'
import _MainLayouts from '../../../layouts/_MainLayouts'
import _Api from '../../../services/Api/_Api'
import { _Button, _Input, _Select } from '../../../services/Forms/Forms'

import { Table, List, Avatar, Button, Skeleton, Steps, Image, Tabs, Form, Breadcrumb, Tag, Spin, Popconfirm, Popover } from 'antd';
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


function ExpandShowDataPengadaan(pr) {

    const { data } = pr;
    const [list, setlist] = useState([])

    const [showFile, setshowFile] = useState(false)
    const [src, setsrc] = useState("")

    const showFileData = (j) => {
        setshowFile(true)
        setsrc("http://192.168.137.1:3369/" + j.filename + "." + j.ext)
    }


    useEffect(() => {
        _Api.get("arsip-getdetailRegister?id_dokumen=" + data.id).then(res => {
            setlist(res.data.data)
        })
    }, [])

    useEffect(() => {
        _Api.get("arsip-getdetailRegister?id_dokumen=" + data.id).then(res => {
            setlist(res.data.data)
        })
    }, [])

    const deleteFile = (fn, ext) => {
        _Api.delete("deleteUpload?filename=" + fn+"&ext="+ext).then(res => {
            // setlist(res.data.data)
            pr.loadData()
        })
    }


    const closePreview = () => {
        setshowFile(false)
        setsrc(null)
    }


    const stile = {
        merah: { background: "red", padding: "5px", color: "white" },
    }
    return (
        <div>
            <_Row style={{ marginBottom: "5px" }}>
                <_Col sm={1} />
                <_Col sm={4} style={stile.merah}>  <b>  &nbsp; Urian Kegiatan </b> </_Col>
                <_Col sm={5} style={stile.merah}> <b> Lampiran </b> </_Col>
                <_Col sm={2} style={stile.merah}> <b> Action </b> </_Col>
            </_Row>

            {list.length > 0 ?
                list.map((item, i) => {
                    return (
                        <div key={i}>
                            {i > 0 && <hr style={{ margin: "5px" }} />}
                            <_Row style={{ marginBottom: "-2px" }}>
                                <_Col sm={1} />
                                <_Col sm={4}> <b style={{ color: "rgb(143 53 11)"}}> {i + 1} . {item.registerpengadaan.toUpperCase()} </b> </_Col>
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
                                                                    :document}
                                                                preview={false} />
                                                        </_Col>
                                                        <_Col onClick={() => showFileData(j)} sm={8} key={ii} style={{ marginTop: "26px", cursor: "pointer" }}>   {ii + 1}. {j.deskripsi}  </_Col>
                                                        <_Col sm={2} key={ii} style={{ marginTop: "26px" }}>
                                                            <Popover placement="bottom" content={<div> Preview </div>}>
                                                                <Button type="primary" icon={<FundViewOutlined />} /> | &nbsp;
                                                            </Popover>
                                                            <Popconfirm
                                                                title="Hapus lampiran .!??"
                                                                onConfirm={() => deleteFile(j.filename, j.ext)}
                                                                okText="Ya, Hapus"
                                                                cancelText="Enggak"
                                                            >
                                                                <Popover placement="bottom" content={<div> Hapus </div>}>
                                                                    <Button type="primary" danger icon={<DeleteOutlined />} /> | &nbsp;
                                                                </Popover>

                                                            </Popconfirm>
                                                            <Popover placement="bottom" content={<div> Edit </div>}>
                                                                <Button type="primary" shape="shape" icon={<EditOutlined />} />
                                                            </Popover>
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
                <Spin style={{ padding: "20px" }} />
            }

            {list.length > 0 && <PreviewPDF showFile={showFile} close={closePreview} src={src} />}
            <br />

        </div>
    )
}

export default ExpandShowDataPengadaan
