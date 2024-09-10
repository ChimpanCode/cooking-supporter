import React from "react";
import { useState } from "react";
import "./Main.css";
import RecipeCard from "./RecipeCard";
import PreviewRecipe from "./PreviewRecipe";
import "./SearchedResults.css";

//料理レシピ検索結果を表示(右側)
// (ingredient) => ingredient === ingredientFilterVal || !ingredientFilterVal
// 条件判定を関数にして (recipe) => recipe === kansu(recipe.ingredients) という説もある そうすればtargetIngredients主体にできる

//const sss = Object.keys[recipes].length;
//console.log(sss);

const SearchResults = ({
  recipes,
  activeRecipe,
  setActiveRecipe,
  as,
  setAs,
  targetIngredients,
  setTargetIngredients,
}) => {
  const checkIngredients = (ingredients) => {
    return targetIngredients.every((targetIngredient) =>
      ingredients.some((ingredient) => ingredient === targetIngredient)
    );
  };

  return (
    <div>
      <h2>検索結果</h2>
      <div className="app-main2">
        {recipes
          .filter((recipe) => checkIngredients(recipe.ingredients))
          .map((recipe, i) => {
            return (
              <RecipeCard
                key={i}
                recipe={recipe}
                activeRecipe={activeRecipe}
                setActiveRecipe={setActiveRecipe}
                as={as}
                setAs={setAs}
              ></RecipeCard>
            );
          })}
      </div>
    </div>
  );
};

export default SearchResults;
