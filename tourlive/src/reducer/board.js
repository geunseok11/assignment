export const initialState = {
  board: [],
  searchList: [],

  loadBoardLoading: false,
  loadBoardDone: false,
  loadBoardError: null,

  loadSearchListLoading: true,
  loadSearchListDone: false,
  loadSearchListError: null,
};

export const LOAD_BOARD_REQUEST = "LOAD_BOARD_REQUEST";
export const LOAD_BOARD_SUCCESS = "LOAD_BOARD_SUCCESS";
export const LOAD_BOARD_FAILURE = "LOAD_BOARD_FAILURE";

export const LOAD_SEARCHLIST_REQUEST = "LOAD_SEARCHLIST_REQUEST"; // search list
export const LOAD_SEARCHLIST_SUCCESS = "LOAD_SEARCHLIST_SUCCESS";
export const LOAD_SEARCHLIST_FAILURE = "LOAD_SEARCHLIST_FAILURE";

export const loadBoard = (data) => {
  console.log("In REDUCER, loadBoard, data ", data);
  return {
    type: LOAD_BOARD_REQUEST,
    data,
  };
};

export const loadSearchList = (keyword) => {
  console.log("In REDUCER,loadSerchList, data : ", keyword);
  return {
    type: LOAD_SEARCHLIST_REQUEST,
    keyword,

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

    case LOAD_SEARCHLIST_REQUEST:
      console.log("In REDUX, LOAD_SEARCHLIST_REQUEST, action : ", action);
      return {
        ...state,
        loadSearchListLoading: true, // search list
        loadSearchListDone: false,
        loadSearchListError: null,
      };
    case LOAD_SEARCHLIST_SUCCESS:
      console.log("In REDUX, LOAD_SEARCHLIST_SUCCESS, action : ", action);
      return {
        ...state,
        loadSearchListLoading: false, // goods list
        loadSearchListDone: true,
        searchList: action.data,
      };
    case LOAD_SEARCHLIST_FAILURE:
      console.log("In REDUX, LOAD_SEARCHLIST_FAILURE, action : ", action);
      return {
        ...state,
        loadSearchListLoading: false,
        loadSearchListError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
