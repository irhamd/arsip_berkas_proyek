import React from "react";
import srcAvatar from "../assets/img/avatars/avatar.jpg";
import { dataUser } from "../services/Cache/Auth";
import { SettingOutlined, SisternodeOutlined, DropboxOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
function _Nav() {
  const { SubMenu } = Menu;


  return (
    <Menu mode="horizontal" style={{ borderColor: "#ef5c17", backgroundImage: "linear-gradient(90deg, rgb(233 154 115), #ed5a12 40%)", padding: "-4px" }}>
      {/* <div className="logo" /> */}
      <Menu.Item key="mail" icon={<DropboxOutlined />}>
        <Link to="DataArsip" > Data Berkas Proyek </Link>
      </Menu.Item>
      <Menu.Item key="app" icon={<SisternodeOutlined />}>
        <Link to="ArsipBerkas" > Arsip Berkas Baru </Link>
      </Menu.Item>
      <SubMenu style={{ float: "right" }} key="SubMenu" icon={<UserSwitchOutlined />} title="Admin">
        <Menu.Item key="setting:1">Logout</Menu.Item>
      </SubMenu>

    </Menu>
  );
}

export default _Nav;
