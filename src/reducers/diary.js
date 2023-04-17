let diaryId = 0;

export const initDiaryAction = (diaryId, diaryList) => {
  return {
    type: "INIT",
    diaryId,
    data: diaryList,
  };
};

export const createDiaryAction = (date, content, emotion) => {
  return {
    type: "CREATE",
    data: {
      id: diaryId++,
      date: new Date(date).getTime(),
      content,
      emotion,
    },
  };
};

export const editDiaryAction = (targetId, date, content, emotion) => {
  return {
    type: "EDIT",
    data: {
      id: targetId,
      date: new Date(date).getTime(),
      content,
      emotion,
    },
  };
};

export const removeDiaryAction = (targetId) => {
  return { type: "REMOVE", targetId };
};

const initialState = [
  // {id: 1, data: 1680220800000, content: 'FAKE LOVE', emotion: 1}
];

export default (state = initialState, action) => {
  let newState = [];

  switch (action.type) {
    case "INIT": {
      diaryId = action.diaryId;
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "EDIT": {
      newState = state.map((it) => {
        return it.id === action.data.id ? { ...action.data } : it;
      });
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => {
        return it.id !== action.targetId;
      });
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState));

  return newState;
};
