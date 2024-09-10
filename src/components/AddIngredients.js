import React from "react";
import { useState } from "react";
import { addIngredientTagToDatabase } from "../hooks/handleDatabase";
import Select from "react-select";
import { Button } from "@mui/material";

const AddIngredients = ({
  ingredients,
  setIngredients,
  ingredientTags,
  setIngredientTags,
  update,
  setUpdate,
}) => {
  const [ingredientVal, setIngredientVal] = useState(""); //材料のステート ここがタグになる
  const [quantityVal, setQuantityVal] = useState(""); //分量のステート

  //ingredientTagsをオブジェクトの配列に変換
  const newOptions = [];
  ingredientTags.map((tag, index) =>
    newOptions.push({ value: tag, label: tag })
  );

  //選択されている材料タグ
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setIngredientVal(selectedOption);
    //console.log(`Option selected:`, selectedOption);
  };

  //新たに出現した材料タグをdbのarrayフィールドに追加 ステートも更新
  const createIngredientTag = () => {
    addIngredientTagToDatabase(ingredientVal);
    setUpdate(!update);
  };

  //材料と分量を合わせたものを材料一覧に追加するメソッド
  const addIngredient = () => {
    setIngredients([
      ...new Set([...ingredients, ingredientVal + ": " + quantityVal]),
    ]);
    //ここで新規材料タグかどうかを条件分岐 新規ならばdbに追加
    ingredientTags.every((ingredientTag) => ingredientTag !== ingredientVal) &&
      createIngredientTag();
    //ステートの初期化処理
    setIngredientVal("");
    setQuantityVal("");
  };

  //<Select>コンポーネントのカスタマイズ
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "50%",
      borderRadius: "none",
      border: "1px solid gray",
      backgroundColor: "#eee",
      textAlign: "center",
      "&:hover": {
        border: "2px solid red",
        cursor: "pointer",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#f00" : "#eee",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "#f88",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#eee",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
    }),
  };

  return (
    <>
      <h3>必要な材料</h3>
      <Select
        options={newOptions}
        value={selectedOption}
        placeholder="材料を検索してください"
        onChange={handleChange}
        styles={customStyles}
      />
      <div>
        <input
          type="text"
          placeholder="分量を入力"
          value={quantityVal}
          onChange={(e) => setQuantityVal(e.target.value)}
        ></input>
        <Button onClick={addIngredient}>材料と分量を登録</Button>
      </div>
      <div>
        {ingredientVal &&
          ingredientTags
            .filter(
              (ingredientTag) => ingredientTag.indexOf(ingredientVal) !== -1
            )
            .map((ingredientTag, i) => {
              return (
                <>
                  <li key={i}>
                    {ingredientTag}
                    <button
                      onClick={() => {
                        setIngredientVal(ingredientTag);
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

export default AddIngredients;

/*
<input
          type="text"
          placeholder="材料を入力"
          value={ingredientVal}
          onChange={(e) => setIngredientVal(e.target.value)}
        />

*/
