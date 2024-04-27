import {Routes as RouterRoutes, Route} from "react-router-dom";
import {Home} from "./components/Home";
import {Posts} from "./components/Posts";
import * as React from "react";
import {About} from "./components/About";

export function Routes() {
    return (
        <RouterRoutes>
            <Route path="/" element={<Home/>}/>
            <Route path="/posts" element={<Posts />}/>
            <Route path="/about" element={<About/>}/>
        </RouterRoutes>
    )
}