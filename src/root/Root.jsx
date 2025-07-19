import React from 'react';
import Nav from '../component/Nav';
import { Outlet } from 'react-router';
import Footer from '../component/Footer';

const Root = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;