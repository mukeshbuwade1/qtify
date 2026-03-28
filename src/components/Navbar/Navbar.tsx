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
    <nav className={styles.navbar}>
      <Link to="/">
        <Logo />
      </Link>
      <Search
        placeholder="Search a song of your choice"
        searchData={searchData}
      />
      <Feedback/>
    </nav>
  );
}

export default Navbar;
