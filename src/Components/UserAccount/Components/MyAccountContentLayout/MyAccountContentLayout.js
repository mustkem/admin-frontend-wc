import React from "react";
import PageTitle from "../PageTitle";

function MyAccountLayout(props) {
  const { pageType } = props;
  return (
    <div>
      <PageTitle pageType={pageType} />
      <div className="my-account-content">{props.children}</div>
    </div>
  );
}

export default MyAccountLayout;
