import axios from "axios";
import {
  LOAD_BOARD_REQUEST,
  LOAD_BOARD_SUCCESS,
  LOAD_BOARD_FAILURE,
} from "../reducer/board";
import { all, fork, call, put, takeLatest, throttle } from "redux-saga/effects";

function loadBoardAPI(data) {
  console.log("In SAGA, loadBoardAPI, data : ", data);
  return axios.get(`v1/tours`);
}

function* loadBoard(action) {
  console.log("In SAGA, loadReview, action : ", action);
  try {
    const result = yield call(loadBoardAPI, action.id);
    console.log("In SAGA loadBoard, 목표 : ", result);
    yield put({
      type: LOAD_BOARD_SUCCESS,
      // TODO : data: result.data,
      // data: result.data[result.data.length - 1],
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

function* watchLoadBoard() {
  console.log("In SAGA, loadBoard, watchLoadBoard");
  yield takeLatest(LOAD_BOARD_REQUEST, loadBoard);
}

export default function* boardSaga() {
  console.log("In GOODS of SAGA, noticeSaga");
  yield all([fork(watchLoadBoard)]);
}
