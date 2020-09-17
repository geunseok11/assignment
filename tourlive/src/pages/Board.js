import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { loadBoard } from "../reducer/board";
import SplitButton from "./buttom";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  content: {
    fontSize: "14px",
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  table: {
    padding: "40px",
  },
}));

const Board = (props) => {
  console.log("boardList, props:", props);
  const dispatch = useDispatch();
  const boardList = useSelector((state) => state.board.data?.results);
  console.log("boardList, results:", boardList);

  const classes = useStyles();

  useEffect(() => {
    dispatch(loadBoard());
  }, []);

  const getFormatDate = (date) => {
    return date.substr(0, 9);
  };

  const getFormatPrice = (price) => {
    return price.substr(0, price.length - 3) + " 원";
  };

  //console.log("뿌리기 board; ", board);
  return (
    <React.Fragment>
      <div className={classes.table}>
        <div className={classes.title}>게시판</div>
        <div>
          <SplitButton></SplitButton>
        </div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.content}>ID</TableCell>
              <TableCell className={classes.content}>제목</TableCell>
              <TableCell className={classes.content}>가격</TableCell>
              <TableCell className={classes.content}>날짜</TableCell>
              <TableCell className={classes.content}>조회수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boardList &&
              boardList.map((el) => (
                <TableRow>
                  <TableCell className={classes.content}>{el.id}</TableCell>
                  <TableCell className={classes.content}>{el.title}</TableCell>
                  <TableCell className={classes.content}>
                    {getFormatPrice(el.price)}
                  </TableCell>
                  <TableCell className={classes.content}>
                    {getFormatDate(el.created_at)}
                  </TableCell>
                  <TableCell className={classes.content}>{el.rate}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default Board;
