import React from "react";
import { useState } from "react";
import "./Sidebar.css";
//import ingredientFilter from "./ingredientFilter";
import IngredientFilter from "./IngredientFilter";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import Select from "react-select";
import { Button } from "@mui/material";
import TargetIngredients from "./TargetIngredients";

const Sidebar = ({
  recipes,
  activeRecipe,
  setActiveRecipe,
  ingredientTags,
  setIngredientTags,
  ingredientFilterVal,
  setIngredientFilterVal,
  targetIngredients,
  setTargetIngredients,
}) => {
  //const [filterVal, setFilterVal] = useState(""); //材料検索の入力欄

  //文字列は空文字だとfalseとして判定されるので、if文に使える

  //ingredientTagsをオブジェクトの配列に変換
  const newOptions = [];
  ingredientTags.map((tag, index) =>
    newOptions.push({ value: tag, label: tag })
  );

  //選択されている材料タグ
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    //console.log(`Option selected:`, selectedOption);
  };

  const addTargetIngredient = () => {
    setTargetIngredients([
      ...new Set([...targetIngredients, selectedOption.value]),
    ]);
  };

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>使用したい材料でレシピを検索</h1>
      </div>
      <div>
        <Select
          options={newOptions}
          value={selectedOption}
          placeholder="材料を検索してください"
          onChange={handleChange}
        />
        <Button variant="contained" onClick={addTargetIngredient}>
          検索条件に追加する
        </Button>
      </div>
      <TargetIngredients
        targetIngredients={targetIngredients}
        setTargetIngredients={setTargetIngredients}
      />
      <Button variant="outlined">この条件でレシピを検索</Button>
    </div>
  );
};

export default Sidebar;

/*
<IngredientFilter
        ingredientTags={ingredientTags}
        setIngredientTags={setIngredientTags}
        ingredientFilterVal={ingredientFilterVal}
        setIngredientFilterVal={setIngredientFilterVal}
        targetIngredients={targetIngredients}
        setTargetIngredients={setTargetIngredients}
      />
      <div>検索条件に追加した材料</div>
      {targetIngredients.map((targetIngredient, i) => {
        return (
          <div>
            <li key={i}>
              {targetIngredient}
              <button onClick={() => deleteTargetIngredient(targetIngredient)}>
                削除
              </button>
            </li>
          </div>
        );
      })}

*/
