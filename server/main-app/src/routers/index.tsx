import React from 'react';
import {HashRouter, Route, Routes } from 'react-router-dom';
import PageA from "../pages/PageA";
import MircoContainer from '../components/mircoContainer';

interface RouteItem {
    key: string,
    path: string,
    render: any,
    exact: boolean
}

const routes: RouteItem[] = [
    {
        key: 'pageA',
        path: '/pageA',
        render: () => <PageA/>,
        exact: true
    },
    {
        key: 'microA',
        path: '/microA',
        render: () => {
            return <MircoContainer name="mircoA" />
        },
        exact: true
    },
    {
        key: 'microB',
        path: '/microB',
        render: () => {
            return <MircoContainer name="mircoB" />
        },
        exact: true
    }
];

const BasicRoute = () => (
    <HashRouter>
        <Routes>
            { routes.map(item => {
                return <Route key={item.key} path={item.path} element={item.render()}></Route>
            }) }
        </Routes>
    </HashRouter>
);

export default BasicRoute;
