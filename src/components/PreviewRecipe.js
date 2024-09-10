import React from "react";
import { useEffect, useState } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import PreviewImage from "./PreviewImage";
import { deleteRecipeFromDatabase } from "../hooks/handleDatabase";
import "./PreviewRecipe.css";
import { Button } from "@mui/material";

const PreviewRecipe = ({
  recipes,
  setRecipes,
  activeRecipe,
  setActiveRecipe,
  as,
  setAs,
  update,
  setUpdate,
}) => {
  //Recipeをdbから削除する
  const deleteRecipe = (recipe) => {
    deleteRecipeFromDatabase(recipe);
    setUpdate(!update); //useEffectを起動しdbからステートに再読み込み
    setAs(!as);
  };

  const [focusRecipe, setForcusRecipe] = useState({});
  recipes
    .filter((recipe) => recipe.id === activeRecipe)
    .map((recipe) => {
      setForcusRecipe(recipe);
    });

  return (
    <div className="preview-recipe-main">
      <Button
        onClick={() => {
          setAs(!as);
        }}
      >
        ←検索結果に戻る
      </Button>

      {recipes
        .filter((recipe) => recipe.id === activeRecipe)
        .map((recipe) => {
          return (
            <React.Fragment key={recipe.id}>
              <h1>{recipe.title}</h1>
              <Button variant="contained" onClick={() => deleteRecipe(recipe)}>
                レシピを削除
              </Button>

              <PreviewImage imageName={recipe.imageName} />
              <div>
                <a href={recipe.source}>レシピページへ</a>
              </div>
              <div className="aaaaa">{"料理工程: " + recipe.process}</div>
              <div>{"材料: "}</div>
              <div>
                {recipe.ingredients.map((ingredient, i) => {
                  return <li key={i}>{ingredient}</li>;
                })}
              </div>
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default PreviewRecipe;
