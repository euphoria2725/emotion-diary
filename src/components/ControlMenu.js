import React, { useEffect } from "react";
import styled from "styled-components";

const Select = styled.select`
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  cursor: pointer;
  font-size: 18px;
`;

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <Select
      className="ControlMenu"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {optionList.map((it, idx) => {
        return (
          <option key={idx} value={it.value}>
            {it.name}
          </option>
        );
      })}
    </Select>
  );
};

// export default ControlMenu;
export default React.memo(ControlMenu);
