import React from "react";
import "./RecipeCard.css";
import PreviewImage from "./PreviewImage";
//ここのonClickを内容閲覧に用いる
const RecipeCard = ({ recipe, activeRecipe, setActiveRecipe, as, setAs }) => {
  return (
    <div
      className={`card ${recipe.id === activeRecipe && "active"}`}
      onClick={() => {
        setActiveRecipe(recipe.id);
        setAs(!as);
      }}
    >
      <div className="cardImg">
        <PreviewImage imageName={recipe.imageName} />
      </div>
      <div className="cardName">{recipe.title}</div>
    </div>
  );
};

export default RecipeCard;
