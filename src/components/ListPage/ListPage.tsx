import React from "react";

 type ListProps={
   id:string,
   name:string,
   full_name:string,
   language:string,
   description:string
 }
const ListPage:React.FC<{list:ListProps[]}>=({ list })=>{
  return (
    <div className="row">
      {list.length === 0
        ? ""
        : list.map((item) => {
            return (
              <div className="item-box col-11 col-md-5" key={item.id}>
                <h3>
                  <a
                    href={`https://github.com/${item.full_name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.name}
                  </a>
                </h3>

                <p>
                  Langueage:<span>{item.language}</span>
                </p>
                <p>
                  Description:<span>{item.description}</span>
                </p>
              </div>
            );
          })}
    </div>
  );
}

ListPage.defaultProps = { list: [] };

export default ListPage;
