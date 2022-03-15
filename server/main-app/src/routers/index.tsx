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

const staticRoutes: RouteItem[] = [
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
    }
];

const BasicRoute = () => {
    const [routes, setRoutes] = useState<RouteItem[]>([]);
    useEffect(() => {
        fetch('https://cdn-app.myshopline.com/web/mirco/routes.json').then(res => {
            console.log(res);
            return res.json();
        }).then(data => {
            console.log(data);
        })
        setTimeout(() => { // 模拟异步加载
            setRoutes([
                ...staticRoutes,
                {
                    key: 'microB',
                    path: '/microB',
                    render: () => {
                        return <MircoContainer name="mircoB" />
                    },
                    exact: true
                }
            ])
        }, 1000);
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
