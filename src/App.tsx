import './App.css';
import SearchPage from "./components/Serch/SearchPage";
import React,{useState} from "react";
import ListPage from "./components/ListPage/ListPage";

type ListProps={
  id:string,
  name:string,
  full_name:string,
  language:string,
  description:string
}

const App:React.FC=()=> {
  const[searchList, setSearchList]=useState<ListProps[]>([]);
  const getSearchList=(list:ListProps[])=>{
    setSearchList(list)
    
  }
  return (
    <div className="container">
      <div className="row pb-3 border-bottom mb-5">
        <div className="col-12 col-md-4 text-center text-white pt-5">APIS developer LOGO</div>
        <div className="col-12 col-md-8 text-right text-white pt-5">Github repositories search app</div>
      </div>
      <div className="row">
        <div className="col-12 col-md-4">
        <SearchPage getSearchList={getSearchList}/>
        </div>
        <div className="col-12 col-md-8 border-left"><ListPage list={searchList}/></div>
      </div>
    </div>
  );
}

export default App;
