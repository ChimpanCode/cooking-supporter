import React from "react";
import { useEffect, useState } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";

const PreviewImage = ({ imageName }) => {
  const [prevUrl, setPrevUrl] = useState("");
  const [error, setError] = useState("");

  const imageUrl =
    "gs://cooking-supporter-b9f69.appspot.com/images/" + imageName;

  const noImageUrl = "./logo192.PNG"; //atcoder-record\src\components\noimage.png

  //画像の名前をpropsとして受け取れば任意の画像を表示できる
  const gsReference = ref(storage, imageUrl);
  //画像をstorageから読み込むためのurlを取得
  getDownloadURL(gsReference)
    .then((url) => {
      setPrevUrl(url);
    })
    .catch((error) => {
      switch (error.code) {
        case "storage/object-not-found":
          setError("目的の参照にオブジェクトが存在しません。");
          break;
        case "storage/unauthorized":
          setError(
            "認証されていないユーザーです。認証してから、もう一度お試しください。"
          );
          break;
        case "storage/canceled":
          setError("ユーザーがオペレーションをキャンセルしました。");
          break;
        case "storage/unknown":
          setError("不明なエラーが発生しました。");
          break;
      }
    });

  return imageName ? (
    <img src={prevUrl} alt={error} width={200} height={200} />
  ) : (
    <img src={noImageUrl} alt="なし" />
  );
};

export default PreviewImage;
