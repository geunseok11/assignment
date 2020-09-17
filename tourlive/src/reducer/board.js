export const initialState = {
  board: [],

  loadBoardLoading: false,
  loadBoardDone: false,
  loadBoardError: null,
};

export const LOAD_BOARD_REQUEST = "LOAD_BOARD_REQUEST";
export const LOAD_BOARD_SUCCESS = "LOAD_BOARD_SUCCESS";
export const LOAD_BOARD_FAILURE = "LOAD_BOARD_FAILURE";

export const loadBoard = (data) => {
  console.log("In REDUCER, loadBoard, data ", data);
  return {
    type: LOAD_BOARD_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOARD_REQUEST:
      console.log("In REDUCER, LOAD_BOARD_REQUEST,");
      return {
        ...state,
        loadBoardLoading: true,
        loadBoardDone: false,
        loadBoardError: null,
      };
    case LOAD_BOARD_SUCCESS:
      console.log("In REDUCER, LOAD_BOARD_SUCCESS, action : ", action.data);
      return {
        ...state,
        loadBoardLoading: false,
        loadBoardDone: true,
        board: action.data,
      };
    case LOAD_BOARD_FAILURE:
      console.log("In REDUCER, LOAD_BOARD_FAILURE action : ", action);
      return {
        ...state,
        loadBoardLoading: false,
        loadBoardError: action.error,
        review: state.board.filter((el) => el.id !== "not found"),
      };
    default:
      return state;
  }
};

export default reducer;
