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
        <table className="table">
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Phone Number</th>
              <th>User Id</th>
              <th>Note</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((item) => {
              return (
                <tr>
                  <td>{item?.product?._id}</td>
                  <td>{item?.product?.title}</td>
                  <td>{item?.phoneNum}</td>
                  <td>{item?.user?._id}</td>
                  <td>{item.note}</td>
                  <td>{item.type}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Queries;
