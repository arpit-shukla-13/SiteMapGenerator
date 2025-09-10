'use client';
import React from 'react'
import { HeaderMegaMenu } from './header';
import { FooterLinks } from './FooterLinks';


const MainLayout = ({ children }) => {
    return (
        <>
            <HeaderMegaMenu />
            {children}
            <FooterLinks />
        </>
    )
}

export default MainLayout;