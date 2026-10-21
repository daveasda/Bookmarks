import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar.jsx';

function Home() {

    return(
        <div className="bg-teal-light" >
            <Navbar />

            <section className="hero"> 
                <img src="/books.webp" className="hero-image"/>
            </section>
            
        </div>

    );
}

export default Home;