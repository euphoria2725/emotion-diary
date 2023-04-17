import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { createDiaryAction, editDiaryAction } from "../reducers/diary";

const DiaryEditor = ({ isEdit, originData }) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  const handleClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        dispatch(createDiaryAction(date, content, emotion));
      } else {
        dispatch(editDiaryAction(originData.id, date, content, emotion));
      }

      navigate("/", { replace: true });
    }
  };

  const contentRef = useRef();
  const navigate = useNavigate();

  return (
    <div className="DiaryEditor">
      <section>
        <h4>오늘은 언제인가요?</h4>
        <div>
          <input
            className="input_date"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
      </section>
      <section>
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((it) => {
            return (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                isSelected={emotion === it.emotion_id}
                onClick={handleClickEmotion}
              />
            );
          })}
        </div>
      </section>
      <section>
        <h4>오늘은 일기</h4>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          ref={contentRef}
          placeholder="오늘은 어땠나요.."
        ></textarea>
      </section>
      <section>
        <div className="control_box">
          <MyButton
            text={"취소하기"}
            onClick={() => {
              navigate(-1);
            }}
          ></MyButton>
          <MyButton
            text={"작성완료"}
            type="positive"
            onClick={handleSubmit}
          ></MyButton>
        </div>
      </section>
    </div>
  );
};

export default DiaryEditor;
