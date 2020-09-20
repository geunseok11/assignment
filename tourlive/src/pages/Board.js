import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { loadBoard, loadSearchList } from "../reducer/board";
import Search from "../component/Search";
import { TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

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
  pazing: {
    left: 50,
  },
}));

const Board = (props) => {
  const dispatch = useDispatch();
  // const [value, onChangeText] = useState("");
  // const [search, setSearch] = useState(false);
  const [page, setPage] = useState("");
  const [current1, setCurrent1] = useState(true);
  const [current2, setCurrent2] = useState(false);
  const [current3, setCurrent3] = useState(false);
  const boardList = useSelector((state) => state.board.data?.results);
  const boardNext = useSelector((state) => state.board.data?.next);
  const boardNextPage = useSelector((state) =>
    state.board.data?.next !== null
      ? state.board.data?.next.substr(state.board.data?.next.length - 7, 7)
      : null
  );
  const boardPre = useSelector((state) => state.board.data?.previous);
  const boardPrePage = useSelector((state) =>
    state.board.data?.previous !== null
      ? state.board.data?.previous.substr(
          state.board.data?.previous.length - 7,
          7
        )
      : null
  );
  const searchList = useSelector((state) => state.searchList.data?.results);
  const classes = useStyles();

  useEffect(() => {
    dispatch(loadBoard(page));
    dispatch(loadSearchList());
  }, [page]);

  const getFormatDate = (date) => {
    return date.substr(0, 9);
  };

  const getFormatPrice = (price) => {
    return price.substr(0, price.length - 3) + " 원";
  };

  // const board = useSelector((state) => state.board.data?.results);

  const data = {
    page1: "",
    page2: "?page=2",
    page3: "?page=3",
  };

  // const onChangeTextSearch = useCallback(
  //   (text) => {
  //     onChangeText(text);
  //   },
  //   [value]
  // );

  // const onPressSearch = useCallback(() => {
  //   // console.log('In Search, onPressSearch, value : ', value)
  //   dispatch(loadSearchList(value));
  // }, [value]);

  const onPressNext = useCallback(() => {
    if (boardNext !== null) {
      dispatch(loadBoard(boardNextPage));
    }
  }, [page]);

  const onPressPage1 = useCallback(() => {
    dispatch(loadBoard(data.page1));
  }, [page]);

  const onPressPage2 = useCallback(() => {
    dispatch(loadBoard(data.page2));
  }, [page]);

  const onPressPage3 = useCallback(() => {
    dispatch(loadBoard(data.page3));
  }, [page]);

  const onPressPrevious = useCallback(() => {
    if (boardPre !== null && boardPre.indexOf("page") !== -1) {
      dispatch(loadBoard(boardPrePage));
    }
  }, [page]);

  const keyword = useSelector((state) => state?.keyword);
  if (keyword) {
    boardList = boardList.filter((item) => item.name.indexOf(keyword) >= 0);
  }

  //console.log("뿌리기 board; ", board);

  return (
    <React.Fragment>
      <div className={classes.table}>
        <div className={classes.title}>게시판</div>
        <div>
          <Search />
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
            {/* {searchList !== 0
              ? searchList &&
                searchList.map((el) => (
                  <TableRow key={el.id}>
                    <TableCell className={classes.content}>{el.id}</TableCell>
                    <TableCell className={classes.content}>
                      {el.title}
                    </TableCell>
                    <TableCell className={classes.content}>
                      {getFormatPrice(el.price)}
                    </TableCell>
                    <TableCell className={classes.content}>
                      {getFormatDate(el.created_at)}
                    </TableCell>
                    <TableCell className={classes.content}>{el.rate}</TableCell>
                  </TableRow>
                ))
              :  */}
            {boardList &&
              boardList.map((el) => (
                <TableRow key={el.id}>
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
      <div
        class="btn-toolbar"
        role="toolbar"
        aria-label="Toolbar with button groups"
        className={classes.table}
      >
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            {/* <li class="page-item disabled">
              <a
                class="page-link"
                href="#"
                aria-label="Previous"
                onClick={onPressPrevious}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li> */}
            <li class="page-item active">
              <a class="page-link" href="#" onClick={onPressPage1}>
                1
              </a>
            </li>
            <li class="page-item ">
              <a class="page-link" href="#" onClick={onPressPage2}>
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" onClick={onPressPage3}>
                3
              </a>
            </li>
            {/* <li class="page-item">
              <a
                class="page-link"
                href="#"
                aria-label="Next"
                onClick={onPressNext}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li> */}
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Board;
