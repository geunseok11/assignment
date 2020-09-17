import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TableContainer } from "@material-ui/core";
import { loadBoard } from "../reducer/board";

const Board = (props) => {
  console.log("boardList, props:", props);
  const dispatch = useDispatch();
  // const [board, setBoard] = useState(true);
  // const boardList = useSelector((state) => state.data.results[0]);
  // console.log("boardList, results:", boardList);
  //const id = results?.id;

  // const data = {
  //   id: id.id,
  // };

  useEffect(() => {
    dispatch(loadBoard());
  }, []);

  //console.log("뿌리기 board; ", board);
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>제목</TableCell>
            <TableCell></TableCell>
            <TableCell>가격</TableCell>
            <TableCell>날짜</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {board.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default Board;
