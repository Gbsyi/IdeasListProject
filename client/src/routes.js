import React from "react";
import { Routes, Route, Navigate} from 'react-router-dom';
import {ListsPage} from './pages/ListsPage';
import {CreatePage} from './pages/CreatePage';
import {DetailPage} from './pages/DetailPage';
import {AuthPage} from './pages/AuthPage';

export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated){
        return (
            <Routes>
                <Route path="/lists" exact element={<ListsPage />} />
                <Route path="/create" exact element={<CreatePage/>} />
                <Route path="/detail/:id" exact element={<DetailPage/>} />
                <Route path="/" element={<Navigate to="/lists" />} />
            </Routes>
        )
    }

    return(
        <Routes>
            <Route path="/" exact element={<AuthPage />} />
            <Route path="/*" element={<Navigate to="/"></Navigate>} />
        </Routes>
    )
}