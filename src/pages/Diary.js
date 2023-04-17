import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

import { emotionList } from "../util/emotion";
import { getStringDate } from "../util/date";

const Diary = () => {
  const diaryList = useSelector((state) => state.diary);

  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `나만의 감정 일기장 - ${id}번 일기`;
  }, []);

  useEffect(() => {
    if (diaryList && diaryList.length > 0) {
      const targetDiary = diaryList.find((it) => {
        return parseInt(it.id) === parseInt(id);
      });

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [diaryList, id]);

  if (!data) {
    return <div className="DiaryPage">로딩 중 입니다...</div>;
  } else {
    const curEmotionData = emotionList.find((it) => {
      return parseInt(it.emotion_id) === parseInt(data.emotion);
    });

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton
              text={"< 뒤로 가기"}
              onClick={() => {
                navigate(-1);
              }}
            />
          }
          rightChild={
            <MyButton
              text={"수정"}
              onClick={() => {
                navigate("/edit/" + id);
              }}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_description">
                {curEmotionData.emotion_description}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
