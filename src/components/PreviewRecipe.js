import React from "react";
import { useState } from "react";
import PreviewImage from "./PreviewImage";
import { deleteRecipeFromDatabase } from "../hooks/handleDatabase";
import "./PreviewRecipe.css";
import { Button } from "@mui/material";

const PreviewRecipe = ({
  recipes,
  activeRecipe,
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

  return (
    <div className="preview-recipe-main">
      <div></div>

      <div className="preview-recipe-contents">
        {recipes
          .filter((recipe) => recipe.id === activeRecipe)
          .map((recipe) => {
            return (
              <React.Fragment key={recipe.id}>
                <div className="">
                  <div className="top">
                    <div className="back">
                      <Button
                        onClick={() => {
                          setAs(!as);
                        }}
                      >
                        ←検索結果に戻る
                      </Button>
                    </div>
                    <div className="delete">
                      <Button
                        variant="contained"
                        onClick={() => deleteRecipe(recipe)}
                      >
                        レシピを削除
                      </Button>
                    </div>
                  </div>
                  <h2>{recipe.title}</h2>

                  <PreviewImage imageName={recipe.imageName} />
                  <div className="url">
                    {URL.canParse(recipe.source) ? (
                      <a
                        href={recipe.source}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        元レシピへ
                      </a>
                    ) : (
                      "無効なURLです"
                    )}
                  </div>
                  <div className="bottom">
                    <div className="left">
                      <h2>料理メモ</h2>
                      <div
                        className="process"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {recipe.process}
                      </div>
                    </div>
                    <div className="right">
                      <h2>材料</h2>
                      <div>
                        {recipe.ingredients.map((ingredient, i) => {
                          return <li key={i}>{ingredient}</li>;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default PreviewRecipe;
