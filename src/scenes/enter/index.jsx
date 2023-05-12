import React from "react";
import Authorization from "../authorization";
import Registration from "../registration";
import { Routes, Route } from "react-router-dom";

const Enter = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Authorization/>}/>
                <Route path='/register' element={<Registration/>}/>
            </Routes>
        </div>
    )
}

export default Enter;