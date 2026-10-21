import React from "react";

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
    <div> Hello, Shop!</div>
    );  
}

export default Shop;
