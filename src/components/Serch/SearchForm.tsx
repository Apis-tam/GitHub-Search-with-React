import React from "react";
type FormProps={
  word:string,
  onChangeSearch:any,
}

const SearchForm:React.FC<FormProps>=(props)=>{
  const { word, onChangeSearch } = props;
  return (  
      <input
        type="text"
        placeholder="search..."
        value={word}
        onChange={onChangeSearch}
      />
      
  );
}
export default SearchForm;
