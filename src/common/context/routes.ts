import {FunctionComponentElement, createElement, FunctionComponent} from 'react';
import Home from "../../todo/pages/home/home.tsx";
import {createBrowserRouter} from "react-router-dom";
import Dashboard from "../../todo/pages/dashboard/dashboard.tsx";
import Project from "../../todo/pages/project/project.tsx";

type Route = {
    path: string
    defaultPage: FunctionComponentElement<FunctionComponent>
    errorPage?: FunctionComponentElement<FunctionComponent>
}

const routes: Route[] = [
    {
        path: "/",
        defaultPage: createElement<FunctionComponent>(Home),
    },
    {
        path: "/dashboard",
        defaultPage: createElement<FunctionComponent>(Dashboard),
    },
    {
        path: "/project/:id",
        defaultPage: createElement<FunctionComponent>(Project),
    },
]

export const initRouter = createBrowserRouter(
    routes.map((route: Route) =>
        ({
            path: route.path,
            element: route.defaultPage,
            errorElement: route.errorPage
        })
    )
)