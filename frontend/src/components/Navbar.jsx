
import React, { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Search, ShoppingCart, UserRound, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const { user, loading } = useAuth();


  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <header className="site-header">
     
      {/* <div className="nav-topbar">
        <span>BookMarks Online Bookstore</span>
      </div> */}

      <nav className="navbar">
      
        <Link to="/" className="nav-logo">
          BOOK<span>MARKS</span>
        </Link>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <NavLink to="/books" onClick={() => setIsOpen(false)}>
            Shop
          </NavLink>

          <NavLink to="/about" onClick={() => setIsOpen(false)}>
            About Us
          </NavLink>
        </div>

        <form className="nav-search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search by Title, Author, Keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="nav-search-input"
          />

          <button
            type="submit"
            className="nav-search-btn"
            aria-label="Search books"
          >
            <Search size={24} />
          </button>
        </form>

               
        <div className="nav-icons">
          <Link to="/cart" aria-label="Shopping cart">
            <ShoppingCart size={27} />
          </Link>

          
          <Link
            to={user ? "/my-profile" : "/account"}
            className="profile-link"
            onClick={(event) => {
              if (loading) event.preventDefault();
            }}
          >
            <UserRound size={29} />
            <span>{user ? "My Profile" : "Sign In"}</span>
          </Link>

        </div>

        
        <button
          type="button"
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
