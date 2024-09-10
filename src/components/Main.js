import React from "react";
import { useState } from "react";
import "./Main.css";
import RecipeCard from "./RecipeCard";
import PreviewRecipe from "./PreviewRecipe";
import SearchedResults from "./SearchedResults";

//料理レシピ検索結果を表示(右側)
//Recipeカードをクリックするとプレビュー画面に遷移する
//分岐は画面が大きく異なるのでjsxに埋め込まずif文で分岐でもよさそう
//レシピ閲覧ページはactiveRecipeのidにより選択する

const Main = ({
  recipes,
  setRecipes,
  activeRecipe,
  setActiveRecipe,
  ingredientFilterVal,
  setIngredientFilterVal,
  as,
  setAs,
  targetIngredients,
  setTargetIngredients,
  update,
  setUpdate,
}) => {
  return (
    <div className="app-main">
      {as ? (
        <SearchedResults
          recipes={recipes}
          activeRecipe={activeRecipe}
          setActiveRecipe={setActiveRecipe}
          as={as}
          setAs={setAs}
          targetIngredients={targetIngredients}
          setTargetIngredients={setTargetIngredients}
        />
      ) : (
        <PreviewRecipe
          recipes={recipes}
          setRecipes={setRecipes}
          activeRecipe={activeRecipe}
          setActiveRecipe={setActiveRecipe}
          as={as}
          setAs={setAs}
          update={update}
          setUpdate={setUpdate}
        />
      )}
    </div>
  );
};

export default Main;
