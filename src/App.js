import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { initDiaryAction } from "./reducers/diary";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const localData = localStorage.getItem("diary");

    if (localData) {
      const diaryList = JSON.parse(localData).sort((a, b) => {
        return parseInt(b.id) - parseInt(a.id);
      });

      if (diaryList.length >= 1) {
        const diaryId = diaryList[0].id + 1;
        dispatch(initDiaryAction(diaryId, diaryList));
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
