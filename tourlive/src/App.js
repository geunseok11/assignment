import React from "react";
import styled from "styled-components";
import Board from "./pages/Board";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

export default function App() {
  return (
    <Provider store={configureStore}>
      <Board />
    </Provider>
  );
}
