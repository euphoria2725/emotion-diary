import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `나만의 감정 일기장 - 새 일기`;
  }, []);

  return (
    <div>
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <DiaryEditor isEdit={false} />
    </div>
  );
};

export default New;
