import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import AddIngredients from "./AddIngredients";
import ImageUploader from "./ImageUploader";
import { addRecipeToDatabase } from "../hooks/handleDatabase";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import "./Register.css";

const Register = ({ ingredientTags, update, setUpdate }) => {
  //レシピをdbに登録するために一時的に保持しておくためのステート群
  const [title, setTitle] = useState(""); //料理名
  const [imageName, setImageName] = useState(""); //画像をfirebasのstorageから読み込むために必要な画像ファイル名
  const [process, setProcess] = useState(``); //料理工程やメモ(改行を含む)
  const [source, setSource] = useState(""); //レシピのURL URLが存在しないとき条件分岐したい

  //ここに材料＋分量を一時的に追加していく これらのステートはレシピオブジェクト化され登録されるのでステートの定義はこの階層でよい
  const [ingredients, setIngredients] = useState([]);
  //検索用にタグのみ保存
  const [forSeatchTags, setForSeatchTags] = useState([]);

  const navigate = useNavigate();

  //新たなレシピを作成しdbに追加しHOMEに遷移する
  const createRecipe = () => {
    const newRecipe = {
      title: title,
      imageName: imageName,
      process: process,
      id: uuid(),
      source: source,
      ingredients: ingredients,
      forSeatchTags: forSeatchTags,
    };
    //必須入力で条件分岐
    if (!checkForm()) return;
    addRecipeToDatabase(newRecipe);
    setUpdate(!update);
    console.log(process);
    checkForm();
    navigate("/"); //登録完了後Homeに遷移する
  };

  //必須項目が入力されているかチェックする関数 料理名＋材料 title=true ingredients.length >= 1
  const checkForm = () => {
    console.log(title && ingredients.length >= 1);
    return title && ingredients.length >= 1;
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
          <TextField
            id="filled-multiline-flexible"
            fullWidth
            label="料理名"
            onChange={(e) => setTitle(() => e.target.value)}
            multiline
            maxRows={1}
            variant="standard"
            placeholder=""
            value={title}
            error={title == ""}
            helperText={title == "" && "料理名が未入力です"}
            sx={{ marginTop: 1 }}
          />
          <TextField
            id="filled-multiline-flexible"
            fullWidth
            label="レシピのURL"
            onChange={(e) => setSource(() => e.target.value)}
            multiline
            maxRows={1}
            variant="standard"
            placeholder=""
            value={source}
            sx={{ marginTop: 1 }}
          />

          <ImageUploader imageName={imageName} setImageName={setImageName} />
          <TextField
            id="filled-multiline-flexible"
            fullWidth
            label="料理に関する工程やメモ(改行可)"
            onChange={(e) => setProcess(() => e.target.value)}
            multiline
            maxRows={20}
            variant="standard"
            placeholder=""
            value={process}
            sx={{ marginTop: 1 }}
          />
        </div>
        <div className="register-contents-right">
          <AddIngredients
            ingredients={ingredients}
            setIngredients={setIngredients}
            ingredientTags={ingredientTags}
            update={update}
            setUpdate={setUpdate}
            forSeatchTags={forSeatchTags}
            setForSeatchTags={setForSeatchTags}
          />
          <h3>追加した材料一覧</h3>
          {ingredients.length >= 1
            ? ingredients.map((ingredient, i) => {
                return <li key={i}>{ingredient}</li>;
              })
            : "1つ以上材料を追加してください"}
          {}
        </div>
      </div>
    </div>
  );
};

export default Register;
//ingredientフィルターにひっかからない材料は新規にdbに追加する

//レシピのdbには材料＋分量の配列を登録する　材料タグは別
/*


<h3>料理名</h3>
          <input
            type="text"
            placeholder="料理名を記入してください"
            onChange={(e) => setTitle(e.target.value)}
          />

*/
