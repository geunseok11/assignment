import { all, fork } from "redux-saga/effects";
import axios from "axios";

import boardSaga from "./board";

axios.defaults.baseURL =
  "http://tourlive-external-1isp315cijj1v-591526764.ap-northeast-2.elb.amazonaws.com:8888/";

export default function* rootSaga() {
  yield all([fork(boardSaga)]);
}
