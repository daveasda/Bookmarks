import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar.jsx';
import BookSection from './BookSection.jsx';

function Home() {

    const books = [
        {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        isbn: "9780735211292",
        price: 3500,
        genre: "Self Help"
        },
        {
        id: 2,
        title: "The Alchemist",
        author: "Paulo Coelho",
        isbn: "9780061122415",
        price: 2800,
        genre: "Fiction"
        },
        {
        id: 3,
        title: "1984",
        author: "George Orwell",
        isbn: "9780451524935",
        price: 2500,
        genre: "Dystopian"
        },
        {
        id: 4,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        isbn: "9780547928227",
        price: 3200,
        genre: "Fantasy"
        },
        {
        id: 5,
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        isbn: "9780590353427",
        price: 3800,
        genre: "Fantasy"
        }
    ];


    return(
        <div className="bg-teal-light" >
            <Navbar />

            <section className="hero"> 
                <img src="/books.jpg" className="hero-image"/>
            </section>

            <BookSection title="Bestsellers" books={books} />

            <BookSection title="Popular" books={books} />
            
        </div>

    );
}

export default Home;