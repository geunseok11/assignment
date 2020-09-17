import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

// import reducer from "../reducers/goods";

import reducer from "../reducer/board";

import rootSaga from "../saga/index";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  // const middlewares = [sagaMiddleware];
  // const enhancer =
  //   process.env.NODE_ENV === "production"
  //     ? compose(applyMiddleware(...middlewares))
  //     : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore();
