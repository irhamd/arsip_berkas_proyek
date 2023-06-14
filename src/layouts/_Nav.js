import React from "react";
import srcAvatar from "../assets/img/avatars/avatar.jpg";
import { dataUser } from "../services/Cache/Auth";
import { SettingOutlined, SisternodeOutlined, DropboxOutlined, UserSwitchOutlined, LogoutOutlined, UserAddOutlined, AccountBookFilled, AccountBookTwoTone, UsergroupAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
function _Nav() {
  const { SubMenu } = Menu;

  const stile = {
    menu: {
      float: "right",
      right: "0px",
      width: "340px",
      backgroundImage: "linear-gradient(45deg, rgb(237 90 18) 10%, rgb(233 154 115) 35%)",
      top: "35px",
      paddingLeft: "70px",
      color: "whitesmoke",
      position: "absolute", borderWidth: "20px", borderStyle: "revert", fontWeight: "bold"
    }
  }



  return (
    <Menu mode="horizontal" style={{
      borderColor: "#ef5c17",
      backgroundImage: "linear-gradient(48deg, rgb(233 154 115) 30%, #ed5a12 35%)"
    }}>
      {/* <div className="logo" /> */}
      <Menu.Item key="11" icon={<DropboxOutlined />}>
        <Link to="DataArsip" > Tambah Arsip Berkas Pekerjaan </Link>
      </Menu.Item>

      <Menu.Item key="33" icon={<SisternodeOutlined />}>
        <Link to="ShowDataPengadaan" > Data Arsip </Link>
      </Menu.Item>
      <Menu.Item key="44" icon={<UsergroupAddOutlined />}>
        <Link to="ManajemenUser" > Manajemen User </Link>
      </Menu.Item>
      <SubMenu style={stile.menu} key="sub7"
        icon={<UserSwitchOutlined style={{ fontSize: "20px" }} />}
        title={dataUser.pegawai && dataUser.pegawai.namapegawai}
      >
        <Menu.Item key="71-1" icon={<LogoutOutlined />}> <Link to={"/login"}>   Logout </Link></Menu.Item>
      </SubMenu>

    </Menu>
  );
}

export default _Nav;
