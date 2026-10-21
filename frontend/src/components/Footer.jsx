import React from "react";
import {Facebook, Twitter, Instagram} from "react-feather";

function Footer() {
    return (
        <footer className="footer">
                 
        <div className="footer-copyright">
            © Copyright {new Date().getFullYear()} | BookMarks
        </div>
        </footer>
    );
}

export default Footer;