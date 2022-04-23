import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer">
      <div id="copyright">&#169; Copyright Movieium</div>
      <Link to="/adminlogin">Admin Login</Link>
    </footer>
  );
};

export default Footer;
