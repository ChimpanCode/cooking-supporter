//db関係の処理を行う関数をまとめる
import React from "react";
import { useState } from "react";
import {
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  collection,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";

//新たなレシピを作成しdbに追加する
const addRecipeToDatabase = async (newRecipe) => {
  await addDoc(collection(db, "recipes"), newRecipe);
};

//指定のRecipeをdbから削除する
const deleteRecipeFromDatabase = async (recipe) => {
  await deleteDoc(doc(db, "recipes", recipe.id));
};

//新たな材料タグを作成しdbに追加する 重複を避ける処理を追加したい 例([...new Set([...ingredientTags, ingredient])]);
const addIngredientTagToDatabase = async (ingredient) => {
  await updateDoc(doc(db, "ingredientTags", "GNOK9PIAb3DXWiG4vZyI"), {
    ingredientTags: arrayUnion(ingredient),
  });
};

//指定の材料タグをdbから削除する
const deleteIngredientTagFromDatabase = async (ingredientTag) => {
  await updateDoc(doc(db, "ingredientTags", "GNOK9PIAb3DXWiG4vZyI"), {
    ingredientTags: arrayRemove(ingredientTag),
  });
};

//dbからレシピを読み込む
const getRecipes = async () => {
  const data = await getDocs(collection(db, "recipes"));
  const data_obj = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return data_obj;
};

//dbから材料タグを読み込む
const getIngredientTags = async () => {
  const data = await getDocs(collection(db, "ingredientTags"));
  const data_obj = data.docs.map((doc) => ({ ...doc.data() }));
  return data_obj[0].ingredientTags;
};

export {
  addRecipeToDatabase,
  deleteRecipeFromDatabase,
  addIngredientTagToDatabase,
  deleteIngredientTagFromDatabase,
  getRecipes,
  getIngredientTags,
};
