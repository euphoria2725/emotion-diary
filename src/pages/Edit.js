import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryEditor from "../components/DiaryEditor";

import { removeDiaryAction } from "../reducers/diary";

const Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const diaryList = useSelector((state) => state.diary);
  const [originData, setOriginData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `나만의 감정 일기장 - ${id}번 일기 수정`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => {
        return parseInt(it.id) === parseInt(id);
      });

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  const handleRomove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(removeDiaryAction(parseInt(id)));
      navigate("/", { replace: true });
    }
  };

  return (
    <div>
      <MyHeader
        headText="일기 수정하기"
        leftChild={
          <MyButton
            text="뒤로 가기"
            onClick={() => {
              navigate(-1);
            }}
          />
        }
        rightChild={
          <MyButton text="삭제하기" type="negative" onClick={handleRomove} />
        }
      />
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
