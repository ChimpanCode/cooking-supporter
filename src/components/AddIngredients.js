import React from "react";
import { useState } from "react";
import { addIngredientTagToDatabase } from "../hooks/handleDatabase";
import Creatable from "react-select/creatable";
import { Button, TextField } from "@mui/material";
import "./AddIngredients.css";

const AddIngredients = ({
  ingredients,
  setIngredients,
  ingredientTags,
  update,
  setUpdate,
  forSeatchTags,
  setForSeatchTags,
}) => {
  const [quantityVal, setQuantityVal] = useState(""); //分量のステート
  const [selectedOption, setSelectedOption] = useState(null); //現在選択されている材料タグ 新規の場合もある これを登録する

  //セレクトバーのためにingredientTags(配列)をオブジェクトの配列に変換
  const newOptions = [];
  ingredientTags.map((tag) => newOptions.push({ value: tag, label: tag }));

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    //setIngredientVal(selectedOption.value);
    console.log(`Option selected:`, selectedOption.value);
  };

  //新たに出現した材料タグをdbのarrayフィールドに追加 ステートも更新
  const createIngredientTag = () => {
    addIngredientTagToDatabase(selectedOption.value);
    setUpdate(!update);
  };

  //材料と分量を結合したものを材料一覧(配列)に追加するメソッド
  const addIngredient = () => {
    setIngredients([
      ...new Set([...ingredients, selectedOption.value + ": " + quantityVal]),
    ]);
    setForSeatchTags([...new Set([...forSeatchTags, selectedOption.value])]);
    //ここで新規材料タグかどうかを条件分岐 新規ならばdbに追加
    ingredientTags.every(
      (ingredientTag) => ingredientTag !== selectedOption.value
    ) && createIngredientTag();
    //次の材料登録のためにステートの初期化処理
    setQuantityVal("");
  };

  //Creatableコンポーネントのカスタマイズ
  const customStyles2 = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      borderRadius: "none",
      border: "1px solid gray",
      backgroundColor: "#FFFFFF",
      textAlign: "center",
      "&:hover": {
        border: "2px solid red",
        cursor: "pointer",
      },
    }),
  };

  return (
    <div className="add-ingredients">
      <h3>検索に用いる材料を検索して必要な分量を入力してください</h3>
      <div className="add-ingredients-form">
        <div className="add-ingredients-form-left">
          <Creatable
            options={newOptions}
            value={selectedOption}
            placeholder="材料を検索してください"
            onChange={handleChange}
            styles={customStyles2}
          />
          <TextField
            value={quantityVal}
            placeholder="分量"
            variant="standard"
            onChange={(e) => setQuantityVal(e.target.value)}
          />
        </div>
        <div className="add-ingredients-form-right">
          <Button variant="contained" onClick={addIngredient}>
            材料を追加
          </Button>
        </div>
      </div>
    </div>
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

        <div className="add-ingredients-list">
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

*/
