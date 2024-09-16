import React from "react";
import { useState } from "react";
import Select from "react-select";
import { Button } from "@mui/material";
import TargetIngredients from "./TargetIngredients";
import "./Sidebar.css";

const Sidebar = ({
  ingredientTags,

  targetIngredients,
  setTargetIngredients,
}) => {
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

  //<Select>コンポーネントのカスタマイズ
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      borderRadius: "none",
      border: "1px solid gray",
      backgroundColor: "#eee",
      textAlign: "center",
      "&:hover": {
        border: "2px solid red",
        cursor: "pointer",
      },
    }),
  };

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>使用したい材料でレシピを検索</h1>
      </div>
      <div className="app-sidebar-select">
        <Select
          options={newOptions}
          value={selectedOption}
          placeholder="材料を選択"
          onChange={handleChange}
          styles={customStyles}
          className="app-sidebar-select-left"
        />
        <Button
          variant="outlined"
          onClick={addTargetIngredient}
          className="app-sidebar-select-right"
        >
          ＋
        </Button>
      </div>
      <TargetIngredients
        targetIngredients={targetIngredients}
        setTargetIngredients={setTargetIngredients}
      />
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
