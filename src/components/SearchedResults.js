import React from "react";
import RecipeCard from "./RecipeCard";
import "./SearchedResults.css";

const SearchResults = ({
  recipes,
  activeRecipe,
  setActiveRecipe,
  as,
  setAs,
  targetIngredients,
}) => {
  //検索条件の材料を含むレシピかどうか判定
  const checkIngredients = (ingredients) => {
    return targetIngredients.every((targetIngredient) =>
      ingredients.some(
        (ingredient) => ingredient.indexOf(targetIngredient) !== -1
      )
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
