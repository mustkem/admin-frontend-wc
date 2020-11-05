import React from 'react';
import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'

export default function (props) {
    return (
        <div>
            <Header />
            {props.children}
            <Footer />
        </div>
    )
}