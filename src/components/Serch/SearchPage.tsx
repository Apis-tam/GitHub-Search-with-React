import React, { useState, useEffect, memo } from "react";

import api from "../../api";
import SearchForm from "./SearchForm";

//////////////////////////////////////////////////////

const useDebounse = (val:string, delay = 1100):string|undefined => {
  const [debounce, setDebounce] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebounce(val), delay);
    return () => clearInterval(timer);
  }, [delay, val]);
  return debounce;
};
///////////////////////////////////////////////////
let historyArr:string[]=[];
//////////////////////////////////////////
const SearchPage:React.FC<{getSearchList:any}> = (props) => {
  const [word, setWord] = React.useState("");
  const [searchList, setSearchList] =  React.useState([]);
  const [err, setErr] =  React.useState("");

  const { getSearchList } = props;
  const debounceWord = useDebounse(word);

  const onChangeSearch = (e:React.FormEvent<HTMLInputElement>):void => {
    setWord(e.currentTarget.value);
  };

  useEffect(() => {
    if (debounceWord) {
      try {
        api.search
          .repository(debounceWord)
          .then((res) =>{
            if(!res.ok){
              setErr("unsuccessfully response");
            }
            setSearchList(res.items);
            setErr("");
          } );
         historyArr=[...historyArr,debounceWord];
        if (historyArr.length === 6) {
          historyArr.shift();
        }
        localStorage.setItem("history", historyArr.join(","));
        setWord("");
        setErr("");
      } catch (err) {
        setErr(err);
      }
    }
  }, [debounceWord]);

  const historyClick = ( item:string) => {
    setWord(item);
  };

  useEffect(() => {
    getSearchList(searchList);
  }, [searchList, getSearchList]);

  let histotyList:string[]  = [];
  const historyData=localStorage.getItem("history");
  if (typeof historyData === 'string') {
    histotyList = historyData.split(",");
  }

  return (
    <>
      <SearchForm word={word} onChangeSearch={onChangeSearch} />
      {err ? <div className="alert alert-danger mt-3">{err}</div> : ""}
      <p className="text-white border-bottom mt-3">Search history:</p>
      <ul className="list-group border-bottom pb-1">
        {histotyList.map((item, idx) => (
          <li
            className="list-group-item bg-transparent border-0 text-white cursor"
            key={idx}
            onClick={() => historyClick( item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};


export default memo(SearchPage);
