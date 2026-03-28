import React from "react";
import { Link } from "react-router-dom";
// import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Feedback from "../Feedback/Feedback";
import Search, { type SearchAlbum } from "../Search/Search";
import styles from "./Navbar.module.css";

type NavbarProps = {
  searchData?: SearchAlbum[];
};

function Navbar({ searchData }: NavbarProps) {
  return (
    <nav className={styles.navbar} data-testid="navbar">
      <Link className={styles.logoLink} to="/">
        <Logo />
      </Link>
      <Search
        placeholder="Search a album of your choice"
        searchData={searchData}
      />
      <Feedback />
    </nav>
  );
}

export default Navbar;
