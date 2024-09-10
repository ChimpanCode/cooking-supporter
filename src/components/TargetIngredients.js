import React from "react";

const TargetIngredients = ({ targetIngredients, setTargetIngredients }) => {
  //検索条件から指定の材料を削除する関数　filterで新たな配列を作りsetStateする
  const deleteTargetIngredient = (targetIngredient) => {
    const newTargetIngredients = targetIngredients.filter(
      (t) => t !== targetIngredient
    );
    setTargetIngredients(newTargetIngredients);
  };

  return (
    <div>
      <h3>検索条件に追加した材料</h3>
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
    </div>
  );
};

export default TargetIngredients;
