import React from 'react'
import { BrowserRouter, Router, Link, Route, Switch, useHistory, Redirect, HashRouter } from 'react-router-dom'
import AttemptAuth from '../auth/AttemptAuth';
// import _Login from '../auth/_Login';
import _MainLayouts from '../layouts/_MainLayouts';

import DataArsip from '../pages/Pemgadaan/DataArsip';
import ShowDataPengadaan from '../pages/Pemgadaan/ShowData/ShowDataPengadaan';
import { Cache } from '../services/Cache';
import ProtectedRoute from '../services/Route/ProtectedRoute';
import { globalText } from '../services/Text/GlobalText';


function Routing() {
    const c404 = () => {
        return (
            <Redirect to={{ pathname: '/home' }} />
        )
    }


    var ses = Cache.get(globalText.x_auth_resu)
    var us = {}
    if (ses) {
        us = JSON.parse(ses)
    }
    // var cek = JSON.parse()

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={AttemptAuth} />
                <ProtectedRoute path="/home" exact component={DataArsip} />
                <ProtectedRoute path="/DataArsip" component={DataArsip} />
                <ProtectedRoute path="/ShowDataPengadaan" component={ShowDataPengadaan} />
                <Route path="*" exact component={() => c404()} />
            </Switch>
        </BrowserRouter>
    )

}

export default Routing
