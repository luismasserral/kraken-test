import {
  RECEIVE_FILES,
  RECEIVE_UPLOADED_FILE,
  RECEIVE_DELETED_FILE
} from "../constants/action-types";

const fileReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_FILES:
      return [...state, ...action.files];
    case RECEIVE_UPLOADED_FILE:
      return [...state, action.file];
    case RECEIVE_DELETED_FILE:
      return [...state.filter(file => file.name != action.filename)];
    default:
      return state;
  }
};

export default fileReducer;
