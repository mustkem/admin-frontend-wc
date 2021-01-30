import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";

import Dashboard from "./Components/Dashboard";
import MyAccountContentLayout from "./Components/MyAccountContentLayout";

import Layout from "./Components/MyAccountLayout/MyAccountLayout";
import Orders from "./Components/Orders";
import OrderDetail from "./Components/OrderDetail";
import AddProduct from "./Components/AddProduct";
import Profile from "./Components/Profile";

function UserAccount() {
  let { path } = useRouteMatch();

  return (
    <Layout>
      <Switch>
        <Route path={`${path}/add-product`}>
          <MyAccountContentLayout pageType="addOrder">
            <AddProduct />
          </MyAccountContentLayout>
        </Route>
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

        <Route path={`${path}/profile`}>
          <MyAccountContentLayout pageType="profileDetails">
            <Profile />
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
