import {Routes as RouterRoutes, Route} from "react-router-dom";
import {Home} from "./components/Home";
import {Posts} from "./components/Posts";
import * as React from "react";
import {About} from "./components/About";
import {RootNode} from "./generated/generated";

type RoutesProps = {
    flags: RootNode
}

export function Routes({flags}: RoutesProps) {
    return (
        <RouterRoutes>
            <Route path="/" element={<Home/>}/>
            <Route path="/posts" element={<Posts flags={flags} />}/>
            <Route path="/about" element={<About/>}/>
        </RouterRoutes>
    )
}