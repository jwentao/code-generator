import React, { useState, useEffect } from 'react';
import {HashRouter, Route, Routes } from 'react-router-dom';
import PageA from "../pages/PageA";
import MircoContainer from '../components/mircoContainer';

interface RouteItem {
    key: string,
    path: string,
    render: () => JSX.Element,
    exact: boolean
}

interface RouteRes {
    entry: string,
    name: string
}
const staticRoutes: RouteItem[] = [
    {
        key: 'pageA',
        path: '/pageA',
        render: () => <PageA/>,
        exact: true
    }
];

const BasicRoute = () => {
    const [routes, setRoutes] = useState<RouteItem[]>([]);
    useEffect(() => {
        fetch('https://cdn-app.myshopline.com/web/mirco/routes.json').then(res => {
            console.log(res);
            return res.json();
        }).then(data => {
            setTimeout(() => { // 模拟异步加载
                setRoutes([
                    ...staticRoutes,
                    ...(data as RouteRes[]).map((item) => ({
                        key: item.name,
                        path: `/${item.name}`,
                        render: () => <MircoContainer name={item.name} entry={item.entry} />,
                        exact: true
                    }))
                ])
            }, 1000);
        })
    }, [])
    return <HashRouter>
        <Routes>
            {routes.map(item => {
                return <Route key={item.key} path={item.path} element={item.render()}></Route>
            })}
        </Routes>
    </HashRouter>
};

export default BasicRoute;
