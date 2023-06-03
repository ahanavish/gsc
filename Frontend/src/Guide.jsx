import React from 'react';
import YTCarousel from './YTCarousel';
import BlogCarousel from './BlogCarousel';
import Navbar from './Navbar';

function Guide() {
    return (
        <div>
            <Navbar item1="Dashboard" item2="Analyze" item3="Predict" item4="Pay" item5="About" />
            <div className='guide-container'>
                <YTCarousel />
                <BlogCarousel />
            </div>
        </div>
    );
}


export default Guide;