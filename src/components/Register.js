import React from "react";
import { useState } from "react";
import {
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import "./Register.css";
import AddIngredients from "./AddIngredients";
import ImageUploader from "./ImageUploader";
import { addRecipeToDatabase } from "../hooks/handleDatabase";
import Select from "react-select";
import { Button } from "@mui/material";

const Register = ({
  ingredientTags,
  setIngredientTags,
  ingredientFilterVal,
  setIngredientFilterVal,
  update,
  setUpdate,
}) => {
  //レシピをdbに登録するために一時的に保持しておくためのステート群
  const [title, setTitle] = useState(""); //料理名
  const [imageName, setImageName] = useState(""); //画像をfirebasのstorageから読み込むために必要なファイル名
  const [process, setProcess] = useState(""); //料理工程
  const [source, setSource] = useState(""); //レシピのURL
  const [ingredients, setIngredients] = useState([]); //ここに材料＋分量を追加していく これらのステートはレシピオブジェクト化され登録されるのでステートの定義はこの階層でよい

  const navigate = useNavigate(); //HOMEに遷移する用

  //新たなレシピを作成しdbに追加しHOMEに遷移する
  const createRecipe = () => {
    const newRecipe = {
      title: title,
      imageName: imageName,
      process: process,
      id: uuid(),
      source: source,
      ingredients: ingredients,
    };
    addRecipeToDatabase(newRecipe);
    setUpdate(!update);
    navigate("/"); //Homeに遷移する
  };

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

  return (
    <div className="register-main">
      <div className="register-title">
        <h2>レシピを登録/編集する</h2>
        <Button variant="contained" onClick={createRecipe}>
          新規登録
        </Button>
      </div>
      <div className="register-contents">
        <div className="register-contents-left">
          <h3>料理名</h3>
          <input
            type="text"
            placeholder="料理名を記入してください"
            onChange={(e) => setTitle(e.target.value)}
          />
          <h3>レシピへのリンク</h3>
          <input
            type="text"
            placeholder="レシピのURLを貼り付けてください"
            onChange={(e) => setSource(e.target.value)}
          />
          <ImageUploader imageName={imageName} setImageName={setImageName} />
          <h3>料理工程/メモ</h3>
          <textarea
            placeholder="メモを記入してください"
            onChange={(e) => setProcess(e.target.value)}
          ></textarea>
        </div>
        <div className="register-contents-right">
          <AddIngredients
            ingredients={ingredients}
            setIngredients={setIngredients}
            ingredientTags={ingredientTags}
            setIngredientTags={setIngredientTags}
            update={update}
            setUpdate={setUpdate}
          />
          <h3>追加した材料一覧</h3>
          {ingredients.map((ingredient, i) => {
            return <li key={i}>{ingredient}</li>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Register;
//ingredientフィルターにひっかからない材料は新規にdbに追加する

//レシピのdbには材料＋分量の配列を登録する　材料タグは別
