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
  return axios.get(`/v1/tours${data}`);
}

function searchListAPI(data) {
  return axios.get(`/v1/tours?search=${data}`);
}

function* loadBoard(action) {
  try {
    const result = yield call(loadBoardAPI, action.data);
    yield put({
      type: LOAD_BOARD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_BOARD_FAILURE,
      error: err.response.data,
    });
  }
}

function* searchList(action) {
  try {
    const result = yield call(searchListAPI, action.keyword);
    yield put({
      type: LOAD_SEARCHLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_SEARCHLIST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadBoard() {
  yield takeLatest(LOAD_BOARD_REQUEST, loadBoard);
}

function* watchSearchList() {
  yield takeLatest(LOAD_SEARCHLIST_REQUEST, searchList);
}

export default function* boardSaga() {
  yield all([fork(watchLoadBoard), fork(watchSearchList)]);
}
