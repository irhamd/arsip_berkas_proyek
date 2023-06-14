// import "../assets/css/app.css";
import _Header from "../layouts/Header";
import { useEffect } from "react";
import _Nav from "../layouts/_Nav";
import _Footer from "./_Footer";

import file from "./../assets/img/file2.png"

import { Image, Layout } from 'antd';

import "./../assets/css/style.css"
import "./../assets/css/style_dua.css"

import img from './../assets/img/top.png';
import { RandomText } from "../services/Text/RandomText";

function _MainLayouts({ children }) {

  const stile = {
    title: {
      fontWeight: "bold", borderColor: "orange", color: "#542615", marginBottom: "0px", marginTop: "5px",
      fontFamily: "BrothersCircus, Arial, serif"
    }
  }
  const { Header, Content, Footer } = Layout;
  return (
    <Layout className="layout" style={{ background: "#ffe7db" }}>
      <div className="body">
        <div style={{ marginLeft: "160px" }}>
          <h2 style={stile.title}> <span >
            ARSIP ONLINE </span> BERKAS PROYEK  <span style={{ color :'#9a3813' }}> RSUD KOTA MATARAM </span> </h2>
          <_Nav />
        </div>
      </div>

      <div style={{ position: 'absolute', top: "0px", left: "50px" }}>
        <Image src={file} width={95} preview={false} />
      </div>
      <Content style={{ padding: '0 20px' }}>

        <div className="" style={{ background: "#ffe7db", marginBottom: "20px" }}>

          {children}

        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>simrs©rsudkotamataram 2021 Created by <b> @FHD </b></Footer>
    </Layout>
  );
}

export default _MainLayouts;