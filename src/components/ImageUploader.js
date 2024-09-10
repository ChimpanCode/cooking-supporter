import React from "react";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import PreviewImage from "./PreviewImage";

//import { useDropzone } from "react-dropzone";
//import firebase, { storage } from "../firebase/firebase";

const ImageUploader = ({ imageName, setImageName }) => {
  //const [uploadedFile, setUploadedFire] = useState({}); //読み込んだファイルを一時的に保存
  //この関数をレシピ登録時に実行すればよいはず
  const OnFileUploadToFirebase = (e) => {
    const file = e.target.files[0];
    //setUploadedFire(file);
    //console.log(uploadedFile);
    const storageRef = ref(storage, "images/" + file.name);
    setImageName(file.name);
    //refを用いてstorageにアップロード
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log(snapshot);
        console.log("upload a file!");
      })
      .catch((error) => {
        switch (error.code) {
          case "storage/unauthorized":
            //"目的の参照にオブジェクトが存在しません。"
            break;
          case "storage/canceled":
            //"ユーザーがオペレーションをキャンセルしました。"
            break;
          case "storage/unknown":
            //"不明なエラーが発生しました。"
            break;
        }
      });
  };

  return (
    <div className="outerBox">
      <div className="title">
        <h3>料理画像をアップロードしてください</h3>
      </div>
      <div className="imageUploadBox">
        <div className="ImageLogoAndText">
          <PreviewImage imageName={imageName}></PreviewImage>
        </div>
        <input
          className="imageUploadInput"
          multiple
          name="imageURL"
          type="file"
          accept=".png, .jpeg, .jpg"
          onChange={OnFileUploadToFirebase}
        />
      </div>
    </div>
  );
};
export default ImageUploader;
