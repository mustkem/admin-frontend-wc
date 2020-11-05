import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";

import AddMoreCoverageItem from "./AddMoreCoverageItem/AddMoreCoverageItem";
import { getCoverageArea, deleteCoverageItem } from "../../../../../../store/actions";

function ManageCoverageArea() {
  const dispatch = useDispatch();

  const states = useSelector((state) => {
    return state.global.states;
  });
  const user = useSelector((state) => {
    return state.user.user;
  });

  const coverage = useSelector((state) => {
    return state.user.coverage;
  });

  useEffect(() => {
    dispatch(getCoverageArea(user.userId || user._id));
  }, []);

  function onDelete(id) {
    dispatch(deleteCoverageItem({ user_id: user.userId || user._id, coverage_id: id }));
  }

  return (
    <div>
      <h6>Manage Coverage Area</h6>
      <div className="profile-info">
        <AddMoreCoverageItem states={states} user={user} />
        <table className="table" striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Pickup</th>
              <th>Delivery</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coverage &&
              coverage.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.pickup_city.city}</td>
                    <td>{item.delivery_city.city}</td>
                    <td>
                      <IoMdClose
                        onClick={() => {
                          onDelete(item._id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageCoverageArea;
