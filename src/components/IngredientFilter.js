import React from "react";
import { useState } from "react";

//検索用のサイドバーにもちいる検索バー←react-selectでいいのでいらない
const IngredientFilter = ({
  ingredients,
  setIngredients,
  ingredientTags,
  setIngredientTags,
  ingredientFilterVal,
  setIngredientFilterVal,
  targetIngredients,
  setTargetIngredients,
}) => {
  return (
    <>
      <h3>検索条件に材料を追加</h3>
      <div>
        <input
          type="text"
          value={ingredientFilterVal}
          onChange={(e) => setIngredientFilterVal(e.target.value)}
        />
      </div>
      <div>
        {ingredientFilterVal &&
          ingredientTags
            .filter(
              (ingredientTag) =>
                ingredientTag.indexOf(ingredientFilterVal) !== -1
            )
            .map((ingredientTag, i) => {
              return (
                <>
                  <li key={i}>
                    {ingredientTag}
                    <button
                      onClick={() => {
                        setTargetIngredients([
                          ...new Set([...targetIngredients, ingredientTag]),
                        ]);
                      }}
                    >
                      追加
                    </button>
                  </li>
                </>
              );
            })}
      </div>
    </>
  );
};

export default IngredientFilter;
