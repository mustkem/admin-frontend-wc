import React from "react";

import "./style/index.scss";

import axios from "axios";

import { API_URL } from "../../../../config";

function Queries(props) {
  const [queries, setQueries] = React.useState([]);

  React.useEffect(() => {
    axios({
      method: "get",
      url: API_URL + "/auth/user/queries",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("woodenculture-token-admin"),
      },
    })
      .then(function (response) {
        setQueries(response.data.queries);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="queries-strip">
      <div className="middle-layout-strip">
        <div className="title">Queries</div>
        <ul>
          <li>
            <span>Product Id</span>
            <span>Product Name</span>
            <span>User Id</span>
            <span>Note</span>
          </li>
          {queries.map((item) => {
            return (
              <li>
                <span>{item?.product?.title}</span>
                <span>{item?.product?._id}</span>
                <span>{item?.user?._id}</span>
                <span>{item.note}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Queries;
