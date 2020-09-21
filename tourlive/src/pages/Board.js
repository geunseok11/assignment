import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { loadBoard, loadSearchList } from "../reducer/board";
import Search from "../component/Search";

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
  const [page, setPage] = useState("");
  const boardList = useSelector((state) => state.board.data?.results);
  const boardCount = useSelector((state) => state.board.data?.count);

  const searchList = useSelector((state) => state.searchList.data?.results);
  const searchCount = useSelector((state) => state.searchList.data?.count);
  const classes = useStyles();

  useEffect(() => {
    dispatch(loadBoard(page));
  }, [page]);

  const getFormatDate = (date) => {
    return date.substr(0, 9);
  };

  const getFormatPrice = (price) => {
    return price.substr(0, price.length - 3) + " 원";
  };

  const data = {
    page1: "",
    page2: "?page=2",
    page3: "?page=3",
  };

  const onPressPage1 = useCallback(() => {
    setPage(data.page1);
    dispatch(loadBoard(data.page1));
  }, [page]);

  const onPressPage2 = useCallback(() => {
    setPage(data.page2);
    dispatch(loadBoard(data.page2));
  }, [page]);

  const onPressPage3 = useCallback(() => {
    setPage(data.page3);
    dispatch(loadBoard(data.page3));
  }, [page]);

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
            {searchCount !== 0 && searchCount && searchCount !== boardCount
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
              : boardList &&
                boardList.map((el) => (
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
            <li
              className={page === data.page1 ? "page-item active" : "page-item"}
              style={{ cursor: "pointer" }}
            >
              <a class="page-link" href="#" onClick={onPressPage1}>
                1
              </a>
            </li>
            <li
              className={page === data.page2 ? "page-item active" : "page-item"}
              style={{ cursor: "pointer" }}
            >
              <a class="page-link" href="#" onClick={onPressPage2}>
                2
              </a>
            </li>
            <li
              className={page === data.page3 ? "page-item active" : "page-item"}
              style={{ cursor: "pointer" }}
            >
              <a class="page-link" href="#" onClick={onPressPage3}>
                3
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Board;
