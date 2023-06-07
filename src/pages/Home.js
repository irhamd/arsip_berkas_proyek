import React from 'react'
import _MainLayouts from '../layouts/_MainLayouts'
// import LayoutAnt from './Layout/LayoutAnt'
// import Logo from "../_Assets/logos/logo-hitam.png"

function Home() {
    return (
        <div>
            <_MainLayouts>
                <div className="">
                    <div className="">
                        <div className="centerTengah" style={{ left: "10%" }}>
                            <img src={""} style={{ right: "0px", width: "150px", zIndex: "999", position: "absolute" }} />
                        </div>
                    </div>
                </div>

            </_MainLayouts>
        </div >
    )
}

export default Home
