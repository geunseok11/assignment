import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadSearchList } from "../reducer/board";

const Search = (props) => {
  const keyword = useSelector((state) => state?.data);
  const dispatch = useDispatch();
  // const [value, onChangeText] = useState("");
  const [value, setValue] = useState("");
  var searchList = useSelector((state) => state.searchList?.results);
  console.log("search", searchList);

  useEffect(() => {
    if (searchList && searchList.length > 0) {
      searchList = [];
    }
  }, [searchList]);

  const onPressSearch = useCallback(() => {
    console.log("In Search, onPressSearch, value : ", value);
    dispatch(loadSearchList(value));
  }, [value]);

  const handleChange = (e) => {
    console.log("target value", e.target.value);
    setValue(e.target.value);
  };
  return (
    <form onSubmit={onPressSearch}>
      <input type="text" value={value} onChange={handleChange} />
      <button type="submit">검색</button>
    </form>
  );
};

export default Search;
