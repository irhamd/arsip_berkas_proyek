import React from "react";
import srcAvatar from "../assets/img/avatars/avatar.jpg";
import { dataUser } from "../services/Cache/Auth";
import { SettingOutlined, SisternodeOutlined, DropboxOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
function _Nav() {
  const { SubMenu } = Menu;


  return (
    <Menu mode="horizontal" style={{ borderColor: "#ef5c17", backgroundImage: "linear-gradient(48deg, rgb(233 154 115) 30%, #ed5a12 35%)", padding: "-4px" }}>
      {/* <div className="logo" /> */}
      <Menu.Item key="11" icon={<DropboxOutlined />}>
        <Link to="DataArsip" > Data Berkas Proyek </Link>
      </Menu.Item>
      
      <Menu.Item key="33" icon={<SisternodeOutlined />}>
        <Link to="ShowDataPengadaan" > List Pengadaan </Link>
      </Menu.Item>
      <SubMenu style={{ float: "right" }} key="SubMenu" icon={<UserSwitchOutlined />} title="Admin">
        <Menu.Item key="setting:1">Logout</Menu.Item>
      </SubMenu>

    </Menu>
  );
}

export default _Nav;
