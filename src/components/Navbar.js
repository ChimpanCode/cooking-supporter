import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { GrDocumentText } from "react-icons/gr";
//<FontAwesomeIcon icon="fa-light fa-file-invoice" />
import {
  faHouse,
  faFilePen,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

//各ページに遷移するためのナビゲーションバー / はホームを指す
const Navbar = () => {
  return (
    <nav>
      <h2>Cooking-Supporter ver.1.0</h2>
      <Link to="/">
        <FontAwesomeIcon icon={faHouse} />
        ホーム
      </Link>
      <Link to="/register">
        <FontAwesomeIcon icon={faHouse} />
        レシピ/材料登録
      </Link>
      <Link to="/tags">
        <FontAwesomeIcon icon={faHouse} />
        登録した材料の確認/削除
      </Link>
    </nav>
  );
};

export default Navbar;
