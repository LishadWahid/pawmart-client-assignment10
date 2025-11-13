import React from 'react';
import Navbar from '../Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import Banner from '../Banner/Banner';
import CategorySection from '../Database/CategorySection';
import LatestListings from '../Page/LatestListings';
import WhyAdopt from '../Home/WhyAdopt';





const RootLayout = () => {
    return (
        <div className='w-full mx-auto'>
            <Navbar></Navbar>
            <Banner></Banner>
            <CategorySection></CategorySection>
            <Outlet></Outlet>
            <LatestListings></LatestListings>
            <WhyAdopt></WhyAdopt>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;