import React, { useEffect, useState } from 'react'
import _MainLayouts from '../../../layouts/_MainLayouts'
import _Api from '../../../services/Api/_Api'
import { _Button, _Input, _Select } from '../../../services/Forms/Forms'

import { Table, List, Avatar, Button, Skeleton, Steps, Image, Tabs, Form, Breadcrumb, Tag, Spin } from 'antd';
import { RandomText } from '../../../services/Text/RandomText';
import { DownloadOutlined, MenuOutlined, MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { _Col, _Row } from '../../../services/Forms/LayoutBootstrap';
import PreviewPDF from '../../PDF/PreviewPDF';

import pdf from "./../../../assets/img/pdf.png"
import img from "./../../../assets/img/image.png"

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

    const stile = {
        merah: { background: "red", padding: "5px", color: "white" },
    }
       return (
        <div>
            <_Row style={{marginBottom :"5px"}}>
                <_Col sm={1} />
                <_Col sm={3} style={stile.merah}>  <b> Urian Kegiatan </b> </_Col>
                <_Col sm={7} style={stile.merah}> <b> Lampiran </b> </_Col>
            </_Row>
         
            {list.length > 0 ?
                list.map((item, i) => {
                    return (
                        <div key={i}>
                            <_Row style={{marginBottom :"-10px"}}>
                                <_Col sm={1} />
                                <_Col sm={3}> <b> {i + 1} . {item.registerpengadaan.toUpperCase()} </b> </_Col>
                                <_Col sm={7}>
                                    <_Row className="lampiran">
                                        {item.detail.map((j, ii) => {
                                            return (
                                                <div style={{ padding: "5px", background: "rgb(255 195 166)", marginBottom: "2px", cursor: "pointer" }} key={ii}>
                                                    <_Row onClick={() => showFileData(j)} >
                                                        <_Col sm={1} >
                                                            <Image width={30} src={j.ext == "pdf" ? pdf : img} preview={false} />
                                                        </_Col>
                                                        <_Col sm={7} key={ii} style={{ marginTop: "26px" }}>   {ii + 1}. {j.deskripsi}  </_Col>
                                                    </_Row>
                                                </div>
                                            )
                                        })}

                                    </_Row>
                                </_Col>
                                <hr />
                            </_Row>
                        </div>
                    )
                })
                :
                <Spin style={{ padding: "20px" }} />
            }

            {list.length > 0 && <PreviewPDF showFile={showFile} close={() => setshowFile(false)} src={src} />}
        </div>
    )
}

export default ExpandShowDataPengadaan
