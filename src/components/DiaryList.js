import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ControlMenu from "./ControlMenu";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

import { filterOptionList, sortOptionList } from "../util/optionList";

const MenuWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightCol = styled.div`
  flex-grow: 1;
`;

const StyledMyButton = styled(MyButton)`
  width: 100%;
  background-color: black;
`;

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState("latest");
  const [filterType, setFilterType] = useState("all");

  // filter + sort가 적용된 아이템 리스트를 만드는 함수
  const getProcessedDiaryList = () => {
    // filter 함수 만들기
    const filterCallBack = (item) => {
      if (filterType === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    // sort에 사용할 compare 함수 만들기
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    // diaryList data 복사하기
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // filter 적용
    const filteredList =
      filterType === "all"
        ? copyList
        : copyList.filter((it) => filterCallBack(it));

    // sort 적용
    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div className="DiaryList">
      <MenuWrapper>
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filterType}
            onChange={setFilterType}
            optionList={filterOptionList}
          />
        </div>
        <RightCol>
          <StyledMyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => {
              navigate("/new");
            }}
          />
        </RightCol>
      </MenuWrapper>

      {getProcessedDiaryList().map((it) => {
        return <DiaryItem key={it.id} {...it} />;
      })}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
