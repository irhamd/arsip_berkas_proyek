import Table from 'rc-table'
import React, { useEffect, useState } from 'react'
import _Api from '../../../services/Api/_Api'
import { _Input } from '../../../services/Forms/Forms'
import UploadBerkas from './UploadBerkas'

function RegisterPengadaan() {

    const [registerpengadaan, setregisterpengadaan] = useState([])





    const columns = [

        {
            title: 'No',
            width: "100px",
            render: (record, i, j) =>
                <div style={{ textAlign: "center" }}>
                    {j + 1}
                </div>

        },
        {
            title: 'Uraian Kegiatan',
            render: (_, rc) =>
                <div>
                    <b style={{ fontSize: "17px" }}> {rc.registerpengadaan} </b>
                </div>
        },
        {
            title: 'Upload File',
            width: "500px",
            render: (record, i, j) =>
                <div> <UploadBerkas /> </div>
        },
        {
            title: 'Keterangan',
            width: "400px",
            render: (record, i, j) =>
                <div>
                    <_Input multiline name="" />
                </div>

        },

    ];

    const loadData = () => {
        _Api.post("getMasterData", { "masterData": "arsip_registerpengadaan_t" }).then(res => {
            setregisterpengadaan(res.data)
        })

    }

  


    useEffect(() => {
        loadData()
    }, [])


    return (
        <div>
            <Table size="small" scroll={{ y: 700 }} pagination={{ pageSize: 30 }} columns={columns} dataSource={registerpengadaan} onChange={onChangeTable} />
        </div>
    )
}

export default RegisterPengadaan
