import React from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import "./Home.css";

//このコンポーネントがレンダリングされる度にdbからレシピをrecipesステートに読み込んでいる
//dbから材料タグも読み込む

const Home = ({
  recipes,
  activeRecipe,
  setActiveRecipe,
  ingredientTags,
  update,
  setUpdate,
}) => {
  const [as, setAs] = useState(true);
  const [targetIngredients, setTargetIngredients] = useState([]); //検索条件に加える材料タグのステート(個数に制限を設ける 3つまで？)

  return (
    <div className="home">
      <Sidebar
        ingredientTags={ingredientTags}
        targetIngredients={targetIngredients}
        setTargetIngredients={setTargetIngredients}
      />
      <Main
        recipes={recipes}
        activeRecipe={activeRecipe}
        setActiveRecipe={setActiveRecipe}
        as={as}
        setAs={setAs}
        targetIngredients={targetIngredients}
        update={update}
        setUpdate={setUpdate}
      />
    </div>
  );
};

export default Home;
