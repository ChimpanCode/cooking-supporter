import React from "react";
//import { useEffect, useState } from "react";
import { deleteIngredientTagFromDatabase } from "../hooks/handleDatabase";
import { Button } from "@mui/material";
import "./PreviewTags.css";

const PreviewTags = ({
  ingredientTags,
  setIngredientTags,
  update,
  setUpdate,
}) => {
  //任意の材料タグを削除する関数
  const deleteIngredientTag = (ingredientTag) => {
    deleteIngredientTagFromDatabase(ingredientTag);
    setUpdate(!update);
  };

  return (
    <div className="previewtags-main">
      {ingredientTags.map((tag, i) => {
        console.log(tag);
        return (
          <li key={i}>
            {tag}
            <Button onClick={() => deleteIngredientTag(tag)}>削除</Button>
          </li>
        );
      })}
    </div>
  );
};

export default PreviewTags;
