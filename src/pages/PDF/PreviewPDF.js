import { Drawer } from 'antd'
import React, { useEffect } from 'react'
import { _Button, _Input } from '../../services/Forms/Forms'
import { _Col, _Row } from '../../services/Forms/LayoutBootstrap'

function PreviewPDF(pr) {

    const { val } = pr;

    return (
        <div>
            <Drawer
                bodyStyle={{ backgroundColor: "#343a40" }}
                onClose={pr.close}
                placement="top" height={1500}
                visible={pr.showFile}>
                <div style={{ height: "50px", background: "#ffffff", padding: "10px" }}>
                    <_Row>
                        <_Input label="Tender / Non" sm={2} value="Non Tender" />
                        <_Input label="Jenis Pengadaan" sm={3} value={val && val.nama} />
                        <_Input label="Nama Pekerjaan" sm={3} value="" />
                        <_Input label="Nama PPK" sm={3} value="" />
                        <_Button label="Tutup" block sm={1} onClick={pr.close} />
                        {/* <_Input label="Tahun Anggaran" sm={2} value="" /> */}
                    </_Row>
                </div>
                {pr.src &&
                    <iframe
                        src={pr.src}
                        style={{ height: "100vh", textAlign: "center" }}
                        width="100%"
                    />
                }
            </Drawer>
        </div >

    )
}

export default PreviewPDF
