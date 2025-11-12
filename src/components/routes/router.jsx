import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import Home from '../Home/Home';
import Login from '../Header/Login';
import Register from '../Header/Register';
import AuthLayout from '../Layouts/AuthLayout';
import CategoryFilteredProduct from '../Database/CategoryFilteredProduct';
import LatestListings from '../Page/LatestListings';
import PetSupply from '../Page/PetSupply';
import ListingDetailsPage from '../Page/ListingDetailsPage';
import AddListingPage from '../Page/AddListingPage';
import MyListingsPage from '../Page/MyListingsPage';
import MyOrdersPage from '../Page/MyOrdersPage';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <RootLayout></RootLayout>,
            children: [
                {
                    path: '/',
                    element: <Home></Home>,
                },
                {
                    path: '/category-filtered-product/:categoryName',
                    element: <CategoryFilteredProduct></CategoryFilteredProduct>,
                },
                {
                    path: '/latest-listings',
                    element: <LatestListings></LatestListings>,
                },
            ],
        },
        {
            path: '/pet-listings',
            element: <PetSupply></PetSupply>,
        },
        {
            path: '/listings',
            element: <AddListingPage></AddListingPage>,
        },
        {
            path: '/listing-details/:id',
            element: <ListingDetailsPage></ListingDetailsPage>,
        },
        {
            path: '/my-listings',
            element: <MyListingsPage></MyListingsPage>,
        },
        {
            path: '/my-orders',
            element: <MyOrdersPage></MyOrdersPage>,
        },
        {
            path: '/auth',
            element: <AuthLayout></AuthLayout>,
            children: [
                {
                    path: '/auth/login',
                    element: <Login></Login>,
                },
                {
                    path: '/auth/register',
                    element: <Register></Register>,
                },
            ],
        },
        {
            path: '*',
            element: <h2>Error 404</h2>,
        },
    ]);
export default router;