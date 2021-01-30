import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import "./style.scss";

function PageTitle(props) {
  const { pageType } = props;
  const pageTypeData = {
    orderDetails: {
      component: AiOutlineHome,
      label: "Order Detail",
    },
    dashboard: {
      component: AiOutlineHome,
      label: "Dashboard",
    },
    orders: {
      component: AiOutlineHome,
      label: "Orders",
    },
    shipOrder: {
      component: AiOutlineHome,
      label: "Ship Order",
    },
    addOrder: {
      component: AiOutlineHome,
      label: "Add Order",
    },
    billing: {
      component: AiOutlineHome,
      label: "Billing",
    },
    support: {
      component: AiOutlineHome,
      label: "Support",
    },
    profileDetails: {
      component: AiOutlineHome,
      label: "My Details",
    },
  };

  const pageTypeDetails = pageTypeData[pageType];

  const IconComponent = pageTypeDetails && pageTypeDetails.component;

  return (
    <div className="app-page-title">
      <div className="page-title-wrapper">
        <div className="page-title-heading">
          {/* <div className="page-title-icon">
            {IconComponent && (
              <IconComponent className="pe-7s-drawer icon-gradient bg-happy-itmeo" />
            )}
          </div>
          <div>{pageTypeDetails && pageTypeDetails.label}</div> */}
        </div>
      </div>
    </div>
  );
}

export default PageTitle;
