import React, { useEffect, useState } from 'react'
import _MainLayouts from '../../../layouts/_MainLayouts'
import _Api from '../../../services/Api/_Api'
import { _Button, _Input, _Select } from '../../../services/Forms/Forms'

import { Table, List, Avatar, Button, Skeleton, Steps, Space, Tabs, Form, Breadcrumb, Tag } from 'antd';
import { RandomText } from '../../../services/Text/RandomText';
import { DownloadOutlined, MenuOutlined, MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { _Col, _Row } from '../../../services/Forms/LayoutBootstrap';

function ExpandDataPengadaan(pr) {

    const { data } = pr;
    const [list, setlist] = useState([])

    useEffect(() => {
        _Api.get("arsip-getdetailRegister?id_dokumen=" + data.id).then(res => {
            setlist(res.data.data)
            console.log(`object`, res.data.data)
        })
    }, [])

    return (
        <div>
            {/* {JSON.stringify(list)} */}
            {list.map((item, i) => {
                return (
                    <div key={i}>
                        <p> {i + 1} .{item.registerpengadaan} </p>
                        <ul>
                            {item.detail.map((j, ii) => {
                                return (
                                    <li key={ii}> {j.filename} </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

export default ExpandDataPengadaan
