import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import PreviewTags from "./components/PreviewTags";
import { useState, useEffect } from "react";
import uuid from "react-uuid";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { getRecipes, getIngredientTags } from "./hooks/handleDatabase";

function App() {
  //登録したレシピのリストのUseState
  const [recipes, setRecipes] = useState([]);

  //現在選択してるレシピをIDで管理するためのステート
  const [activeRecipe, setActiveRecipe] = useState(false);

  //登録した材料タグのリストのステート これの定義はアプリ全体で使うのでここでいい　これもFirebaseに保存する
  const [ingredientTags, setIngredientTags] = useState([]);

  //レシピ検索用のフィルターのステート←ここにある必要なくね
  const [ingredientFilterVal, setIngredientFilterVal] = useState("");

  //このステートが変化したときUseEffectによりdbからレシピとタグを読み込む
  const [update, setUpdate] = useState(true);

  //FireBaseからレシピと材料タグを読み込む処理
  useEffect(() => {
    //console.log("ここまでもいけてない");
    const fetchData = async () => {
      try {
        //dbにリクエストを実行
        const recipesData = await getRecipes();
        const ingredientTagsData = await getIngredientTags();
        setRecipes(recipesData);
        setIngredientTags(ingredientTagsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    console.log(`データベースから情報が読み込まれました。`);
  }, [update]); //useEffectが第二引数の配列が変化した場合のみ実行 空の配列[]の場合初回レンダリング時のみ実行

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              recipes={recipes}
              setRecipes={setRecipes}
              activeRecipe={activeRecipe}
              setActiveRecipe={setActiveRecipe}
              ingredientTags={ingredientTags}
              setIngredientTags={setIngredientTags}
              ingredientFilterVal={ingredientFilterVal}
              setIngredientFilterVal={setIngredientFilterVal}
              update={update}
              setUpdate={setUpdate}
            />
          }
        ></Route>
        <Route
          path="/register"
          element={
            <Register
              ingredientTags={ingredientTags}
              setIngredientTags={setIngredientTags}
              ingredientFilterVal={ingredientFilterVal}
              setIngredientFilterVal={setIngredientFilterVal}
              update={update}
              setUpdate={setUpdate}
            />
          }
        ></Route>
        <Route
          path="/tags"
          element={
            <PreviewTags
              ingredientTags={ingredientTags}
              setIngredientTags={setIngredientTags}
              update={update}
              setUpdate={setUpdate}
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
