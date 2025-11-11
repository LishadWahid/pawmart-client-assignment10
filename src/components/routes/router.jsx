import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import Home from '../Home/Home';
import Login from '../Header/Login';
import Register from '../Header/Register';
import AuthLayout from '../Layouts/AuthLayout';
import CategoryFilteredProduct from '../Database/CategoryFilteredProduct';
import LatestListings from '../Page/LatestListings';

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