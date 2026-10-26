import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({children}) {
    
    // Read the existing guest cart when the app starts.
    const [cartItems, setCartItems] = useState(() => {
        try{
            const savedCart = localStorage.getItem("bookmarks_guest_cart");
            const parsed = savedCart ? JSON.parse(savedCart) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch{
            return [];
        }
    });

    // Save cart changes in the browser.
    useEffect(() => {
        localStorage.setItem("bookmarks_guest_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Add a new book or increase its existing quantity.
    const addToCart = (book, quantity = 1) => {
        setCartItems((previous) => {
            const existing = previous.find(
                (item) => item.id === book.id
            );
        
            if (existing) {
                return previous.map((item) => 
                item.id === book.id ? {...item, quantity: item.quantity + quantity} : item);
                
            }

            return [...previous, {id: book.id, title: book.title, price: book.price, image: book.image, quantity}];
        });
    };

    //Change a book's quantity
    const updateQuantity = (id, change) => {
        setCartItems((previous) => previous.map((item) => item.id === id ? {...item, quantity:Math.max(1, item.quantity + change),}: item));
    };

    // Remove a book completely.
    const removeItem = (id) => {
        setCartItems((previous) =>
        previous.filter((item) => item.id !== id)
        );
    };

    const clearCart = () => setCartItems([]);

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return(<CartContext.Provider value={{cartItems, addToCart, updateQuantity, removeItem, clearCart, cartTotal}}> 
                {children}
           </CartContext.Provider>);
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}