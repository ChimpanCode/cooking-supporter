import React from "react";
import PreviewImage from "./PreviewImage";
import "./RecipeCard.css";

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
