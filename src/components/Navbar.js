import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHouse,
  faArrowRightToBracket,
  faFile,
  faLemon,
} from "@fortawesome/free-solid-svg-icons";

//各ページに遷移するためのナビゲーションバー / はホームを指す
const Navbar = () => {
  return (
    <nav>
      <h2>Cooking-Supporter</h2>
      <Link to="/">
        <FontAwesomeIcon icon={faHouse} />
        ホーム
      </Link>
      <Link to="/register">
        <FontAwesomeIcon icon={faFile} />
        レシピ/材料登録
      </Link>
      <Link to="/tags">
        <FontAwesomeIcon icon={faLemon} />
        登録した材料の確認/削除
      </Link>
      <Link to="/">
        <FontAwesomeIcon icon={faArrowRightToBracket} />
        ログイン（未実装）
      </Link>
    </nav>
  );
};

export default Navbar;
