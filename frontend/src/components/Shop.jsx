import React from "react";
import Navbar from "./Navbar.jsx";
import BookSection from "./BookSection.jsx";
import Footer from "./Footer.jsx";

function Shop() {

    const books = [
        {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        isbn: "9780735211292",
        image: "/atomic-habits.jfif",
        price: 3500,
        genre: "Self Help"
        },
        {
        id: 2,
        title: "The Alchemist",
        author: "Paulo Coelho",
        isbn: "9780061122415",
        image: "/the-alchemist.jfif",
        price: 2800,
        genre: "Fiction"
        },
        {
        id: 3,
        title: "1984",
        author: "George Orwell",
        isbn: "9780451524935",
        image: "/1984.jfif",
        price: 2500,
        genre: "Dystopian"
        },
        {
        id: 4,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        isbn: "9780547928227",
        image: "/the-hobbit.jfif",
        price: 3200,
        genre: "Fantasy"
        },
        {
        id: 5,
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        isbn: "9780590353427",
        image: "/harry-potter.jfif",
        price: 3800,
        genre: "Fantasy"
        }
    ];

  return (
    <div> 
        <Navbar />

        <section className="hero"> 
                <img src="/shop.webp" className="hero-image"/>
        </section>

        <BookSection title="Fiction" books={books} />

        <BookSection title="Non-Fiction" books={books} />

        <BookSection title="Fantasy" books={books} />

        <BookSection title="Horror" books={books} />

        <Footer />
    
    </div>
    );  
}

export default Shop;
