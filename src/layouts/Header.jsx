import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { routes, routes_admin } from "../routing/routes";
import { Cache } from "../services/Cache";
import { globalText } from "../services/Text/GlobalText";

function _Header() {
  var rout = []
  var ses = Cache.get(globalText.x_auth_resu)
  var auth = {}
  if (ses) {
    auth = JSON.parse(ses)
    rout = auth.role == 'Dosen' ? routes : routes_admin
    // if(auth.role == 'Dosen') rout = routes_admin else 
  }

  const route = rout.map((item, i) => {
    return (
      <li className="sidebar-item" key={i}>
        <Link className="sidebar-link" to={`${item.to}`}>
          <i className={`fa ${item.icon}`}></i>
          <span className="align-middle">{item.title}</span>
        </Link>
      </li>
    );
  });

  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand">
          <i className="fa fa-map" /> &nbsp;
          <span className="align-middle">SPOn</span>
          <p
            style={{ fontSize: "10px", marginBottom: "-10px", color: "aqua" }}
          >
            Online
          </p>
        </a>
        <ul className="sidebar-nav">
          {route}
          {/* <li className="sidebar-header">Data Penunjang</li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="charts-chartjs.html">
              <i className="fa fa-chart-pie" />
              <span className="align-middle">Charts</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="maps-google.html">
              <i className="fa fa-map" />
              <span className="align-middle">Maps</span>
            </a>
          </li> */}
        </ul>
        <div className="sidebar-cta">
          <div className="sidebar-cta-content">
            <strong className="d-inline-block mb-2">Auth</strong>
            <div className="d-grid">
              <Link to="/login" className="btn btn-primary">
                <i className="fa fa-sign-out-alt" /> Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default _Header;
