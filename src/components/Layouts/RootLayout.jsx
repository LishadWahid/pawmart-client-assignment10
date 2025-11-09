import React from 'react';
import Navbar from '../Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import Banner from '../Banner/Banner';
import OurServices from '../Banner/OurService';



const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <Banner></Banner>
            <OurServices></OurServices>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;