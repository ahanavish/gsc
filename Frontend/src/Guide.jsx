import React from 'react';
import YTCarousel from './YTCarousel';
import BlogCarousel from './BlogCarousel';
import Navbar from './Navbar';

function Guide() {
    return (
        <div>
            <Navbar />
            <div className='guide-container'>
                <YTCarousel />
                <BlogCarousel />
            </div>
        </div>
    );
}


export default Guide;