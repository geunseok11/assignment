import axios from "axios";
import {
  LOAD_BOARD_REQUEST,
  LOAD_BOARD_SUCCESS,
  LOAD_BOARD_FAILURE,
  LOAD_SEARCHLIST_REQUEST,
  LOAD_SEARCHLIST_SUCCESS,
  LOAD_SEARCHLIST_FAILURE,
} from "../reducer/board";
import { all, fork, call, put, takeLatest } from "redux-saga/effects";

function loadBoardAPI(data) {
  console.log("In SAGA, loadBoardAPI, data : ", data);
  return axios.get(`/v1/tours${data}`);
}

function searchListAPI(data) {
  console.log("In SAGA, searchListAPI, data : ", data); // search
  return axios.get(`/v1/tours?search=${data}`);
}

function* loadBoard(action) {
  console.log("In SAGA, loadBoard, action : ", action);
  try {
    const result = yield call(loadBoardAPI, action.data);
    console.log("In SAGA loadBoard, result : ", result);
    yield put({
      type: LOAD_BOARD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_BOARD_FAILURE,
      error: err.response.data,
    });
  }
}

function* searchList(action) {
  console.log("In SAGA, searchList, action : ", action);
  try {
    const result = yield call(searchListAPI, action.keyword);
    console.log("In SAGA, searchList, result : ", result);
    yield put({
      type: LOAD_SEARCHLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOAD_SEARCHLIST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadBoard() {
  console.log("In SAGA, loadBoard, watchLoadBoard", loadBoard);
  yield takeLatest(LOAD_BOARD_REQUEST, loadBoard);
}

function* watchSearchList() {
  console.log("In SAGA, watchSearchList, executes ");
  yield takeLatest(LOAD_SEARCHLIST_REQUEST, searchList);
}

export default function* boardSaga() {
  console.log("In GOODS of SAGA, noticeSaga");
  yield all([fork(watchLoadBoard), fork(watchSearchList)]);
}
