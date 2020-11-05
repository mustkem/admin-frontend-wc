import React, { useEffect, useState } from "react";
import EditDataItem from "./EditDataItem/EditDataItem";
import { useSelector } from "react-redux";

function EditProfile() {
  const user = useSelector((state) => {
    return state.user.user ? state.user.user : {};
  });

  console.log(user);

  return (
    <div>
      <h6>My Info</h6>
      <div className="profile-info">
        <EditDataItem user={user} editable label="Name" value={user.name} dataKey="name" />

        <EditDataItem label="Email" value={user.email} />
        <EditDataItem
          user={user}
          editable
          label="Company Name"
          value={user.company_name}
          dataKey="company_name"
        />

        <EditDataItem
          user={user}
          editable
          label="Mobile No."
          value={user.mobile}
          dataKey="mobile"
        />
        <EditDataItem
          user={user}
          editable
          label="Password"
          value={user.password}
          dataKey="password"
          type="password"
        />
      </div>
    </div>
  );
}

export default EditProfile;
