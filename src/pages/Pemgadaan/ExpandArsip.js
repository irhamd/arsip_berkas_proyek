import { Table, List, Avatar, Button, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import _Api from '../../services/Api/_Api';

import img from "./../../assets/img/pdf.png"

function ExpandArsip() {
    const [datas, setdatas] = useState([])

    const loadData = () => {
        _Api.get("arsip-getBerkas").then(res => {
            setdatas(res.data.data)
            console.log(`res.data`, res.data.data)
        })
    }

    useEffect(() => {
        loadData()
    }, [])



    return (
        <div>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                style={{ background: "#d7e3f5" }}
                dataSource={datas}
                renderItem={(item, i) =>
                (
                    <div style={{ margin: "0px 800px 0px 100px" }}>
                        <List.Item
                            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={img} />}
                                title={<a>   <b> {item.perihal} </b></a>}
                            />
                            <div>content</div>
                        </List.Item>
                    </div>
                )
                }
            />
        </div>
    )
}

export default ExpandArsip
