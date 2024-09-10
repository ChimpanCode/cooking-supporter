import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import Main from "./Main";
import "./Home.css";

//このコンポーネントがレンダリングされる度にdbからレシピをrecipesステートに読み込んでいる
//dbから材料タグも読み込む

const Home = ({
  recipes,
  setRecipes,
  activeRecipe,
  setActiveRecipe,
  ingredientTags,
  setIngredientTags,
  ingredientFilterVal,
  setIngredientFilterVal,
  update,
  setUpdate,
}) => {
  const [as, setAs] = useState(true);
  const [targetIngredients, setTargetIngredients] = useState([]); //検索条件に加える材料タグのステート(個数に制限を設ける 3つまで？)

  return (
    <div className="home">
      <Sidebar
        recipes={recipes}
        activeRecipe={activeRecipe}
        setActiveRecipe={setActiveRecipe}
        ingredientTags={ingredientTags}
        setIngredientTags={setIngredientTags}
        ingredientFilterVal={ingredientFilterVal}
        setIngredientFilterVal={setIngredientFilterVal}
        targetIngredients={targetIngredients}
        setTargetIngredients={setTargetIngredients}
      />

      <Main
        recipes={recipes}
        setRecipes={setRecipes}
        activeRecipe={activeRecipe}
        setActiveRecipe={setActiveRecipe}
        as={as}
        setAs={setAs}
        targetIngredients={targetIngredients}
        setTargetIngredients={setTargetIngredients}
        update={update}
        setUpdate={setUpdate}
      />
    </div>
  );
};

export default Home;
