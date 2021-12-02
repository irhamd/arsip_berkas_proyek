// import "../assets/css/app.css";
import _Header from "../layouts/Header";
import { useEffect } from "react";
import _Nav from "../layouts/_Nav";
import _Footer from "./_Footer";

import { Layout, Menu, Breadcrumb } from 'antd';

import "./../assets/css/style.css"

import img from './../assets/img/top.png';
import { RandomText } from "../services/Text/RandomText";

function _MainLayouts({ children }) {

  const { Header, Content, Footer } = Layout;
  return (
    <Layout className="layout" style={{ background: "#ffe7db" }}>
      <div className="body">
        <div style={{ width: "100%", marginLeft: "200px" }}>
          <h2 style={{ fontWeight: "bold", borderColor: "orange", marginLeft: "20px", marginBottom: "0px" }}> ARSIP BERKAS PROYEK  </h2>
          <_Nav />
        </div>
      </div>
      <Content style={{ padding: '0 50px' }}>

        <div className="" style={{ background: "#ffe7db", marginBottom: "20px" }}>

          {children}

        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by <b> @FHD </b></Footer>
    </Layout>
  );
}

export default _MainLayouts;
