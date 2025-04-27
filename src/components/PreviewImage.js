import React from "react";
import { useState } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import noImage from "../images/noimage.png";
import "./PreviewImage.css";

const PreviewImage = ({ imageName }) => {
  const [prevUrl, setPrevUrl] = useState("");
  const [error, setError] = useState("");

  //storageから画像を持ってくるためのurlを構成
  const imageUrl =
    "gs://cooking-supporter-b9f69.appspot.com/images/" + imageName;

  const noImageUrl = "./images/noimage.png"; //atcoder-record\src\components\noimage.png

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
    <img src={noImage} alt="画像がありません" className="preview-image" />
  );
};

export default PreviewImage;
