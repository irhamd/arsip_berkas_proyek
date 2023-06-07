import React from 'react'
import { Table, List, Avatar, Button, Skeleton, Steps, Space, Tabs } from 'antd';


function RenderSteps(pr) {

    const { Step } = Steps;
    return (
        <div>
            <Steps style={{ background: "#f8a477", padding: "10px", borderRadius: "0px 10px" }} current={pr.steps}>
                <Step title="Jenis Pekerjaan" description="Jenis pekerjaan" />
                <Step title="Jenis Pengadaan" description="Pilih jenis pengadaan" />
                <Step title="Register Pengadaan" description="Uraian kegiatan" />
                <Step title="Review Berkas" description="Upload berkas ," />
                <Step title="Selesai" description="Selesai" />
            </Steps>
        </div>
    )
}

export default RenderSteps
