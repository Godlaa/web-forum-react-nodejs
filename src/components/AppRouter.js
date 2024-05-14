import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { Context } from "../index";

const AppRouter = () => {
    const {user_store} = useContext(Context);

    return (
        <Routes>
            {user_store.isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />} />
            )}
        </Routes>
    );
}

export default AppRouter;