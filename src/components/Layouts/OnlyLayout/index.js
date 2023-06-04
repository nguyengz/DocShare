import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import Main from '../Main';
import { useMediaQuery, useTheme } from '@mui/material';


function DefaultLayout({ children }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <>
            <Header />
            <Main>
                {children}
            </Main>
            {matches ? <Footer /> : null}
        </>
    );
}

export default DefaultLayout;
