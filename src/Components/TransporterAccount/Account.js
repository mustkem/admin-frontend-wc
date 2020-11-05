import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";

import Dashboard from "./Components/Dashboard";
import MyAccountContentLayout from "./Components/MyAccountContentLayout";

import Layout from "./Components/MyAccountLayout/MyAccountLayout";
import Billing from "./Components/Billing";
import Orders from "./Components/Orders";
import OrderDetail from "./Components/OrderDetail";
import Support from "./Components/Support";
import Profile from "./Components/Profile";
import PriceSetting from "./Components/PriceSetting";

function UserAccount() {
  let { path } = useRouteMatch();

  return (
    <Layout>
      <Switch>
        <Route path={`${path}/orders/:id`}>
          <MyAccountContentLayout pageType="orderDetails">
            <OrderDetail />
          </MyAccountContentLayout>
        </Route>
        <Route path={`${path}/orders`}>
          <MyAccountContentLayout pageType="orders">
            <Orders />
          </MyAccountContentLayout>
        </Route>
        <Route path={`${path}/billing`}>
          <MyAccountContentLayout pageType="billing">
            <Billing />
          </MyAccountContentLayout>
        </Route>
        <Route path={`${path}/support`}>
          <MyAccountContentLayout pageType="support">
            <Support />
          </MyAccountContentLayout>
        </Route>
        <Route path={`${path}/profile`}>
          <MyAccountContentLayout pageType="profileDetails">
            <Profile />
          </MyAccountContentLayout>
        </Route>
        <Route path={`${path}/price-setting`}>
          <MyAccountContentLayout pageType="priceSetting">
            <PriceSetting />
          </MyAccountContentLayout>
        </Route>
        <Route path={path}>
          <MyAccountContentLayout pageType="dashboard">
            <Dashboard />
          </MyAccountContentLayout>
        </Route>
      </Switch>
    </Layout>
  );
}

export default UserAccount;
