import React from "react";
import PreviewRecipe from "./PreviewRecipe";
import SearchedResults from "./SearchedResults";
import "./Main.css";

//料理レシピ検索結果を表示(右側)
//Recipeカードをクリックするとプレビュー画面に遷移する
//分岐は画面が大きく異なるのでjsxに埋め込まずif文で分岐でもよさそう
//レシピ閲覧ページはactiveRecipeのidにより選択する

const Main = ({
  recipes,
  activeRecipe,
  setActiveRecipe,
  as,
  setAs,
  targetIngredients,
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
        />
      ) : (
        <PreviewRecipe
          recipes={recipes}
          activeRecipe={activeRecipe}
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
