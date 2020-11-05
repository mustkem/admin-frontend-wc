import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import { useDispatch, useSelector } from "react-redux";
import { path as ramdaPath } from "ramda";
import moment from "moment";
import { Link, Switch, Route } from "react-router-dom";
import { getOrders } from "../../../../../../store/actions";
import Button from "react-bootstrap/Button";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";

function UserOrders(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.user;
  });
  const orders = useSelector((state) => ramdaPath(["orders", "orderList", "orders"], state));
  useEffect(() => {
    dispatch(getOrders(user._id || user.userId));
  }, []);

  const addedOrders = [];
  const inProgressOrders = [];
  const completedOrders = [];
  orders &&
    orders.forEach((item) => {
      let positiveFlagCount = 0;
      for (let i = 0; i < item.order_status.length; i++) {
        if (item.order_status[i].value) {
          positiveFlagCount++;
        }
      }
      if (positiveFlagCount === 1) {
        addedOrders.push(item);
      }
      if (positiveFlagCount > 1 && positiveFlagCount < item.order_status.length) {
        inProgressOrders.push(item);
      }
      if (positiveFlagCount === item.order_status.length) {
        completedOrders.push(item);
      }
    });

  return (
    <div className="order-nav-tabs-wrapper">
      <div className="order-nav-tabs">
        <TabContainer defaultActiveKey="first">
          <div className="order-card-header">
            <Nav>
              <div className="btn-actions-pane-right">
                <div className="btn-group-sm btn-group">
                  <Nav.Link className="btn-shadow btn btn-primary" eventKey="first">
                    Orders
                  </Nav.Link>
                  <Nav.Link className="btn-shadow  btn btn-primary" eventKey="second">
                    In Progress
                  </Nav.Link>
                  <Nav.Link className="btn-shadow  btn btn-primary" eventKey="third">
                    Completed
                  </Nav.Link>
                </div>
              </div>
            </Nav>
            <div className="order-right-sec">
              <Button className="main-btn order-btn link-btn">
                <Link to="/dashboard/orders/add-order">Add New Order</Link>
              </Button>
            </div>
          </div>

          <div className="tab-content-wrap">
            <Tab.Content>
              <TabPane eventKey="first">
                <ul className="list list-orders ">
                  <TableRow />
                  {addedOrders.map((item, index) => {
                    return <OrderItem key={index} item={item} canShip />;
                  })}
                  {!addedOrders.length && <div className="p-10 m-0-auto wd-100">Empty</div>}
                </ul>
              </TabPane>
              <TabPane eventKey="second">
                <ul className="list list-orders ">
                  <TableRow />
                  {inProgressOrders.map((item, index) => {
                    return <OrderItem key={index} item={item} canView />;
                  })}
                  {!inProgressOrders.length && <div className="p-10 m-0-auto wd-100">Empty</div>}
                </ul>
              </TabPane>
              <TabPane eventKey="third">
                <ul className="list list-orders ">
                  <TableRow />
                  {completedOrders.map((item, index) => {
                    return <OrderItem key={index} item={item} canGenerateReceipt />;
                  })}
                  {!completedOrders.length && <div className="p-10 m-0-auto wd-100">Empty</div>}
                </ul>
              </TabPane>
            </Tab.Content>
          </div>
        </TabContainer>
      </div>
    </div>
  );
}

export default UserOrders;

const TableRow = (props) => {
  return (
    <li className="list-item list-item-head">
      <span className="item-bar">Order Id #</span>
      <span className="item-bar">Customer Detail</span>
      <span className="item-bar">Order Date</span>
      <span className="item-bar">Package detail</span>
      <span className="item-bar">Category</span>
      <span className="item-bar">Weight</span>
      <span className="item-bar">Action</span>
    </li>
  );
};

const OrderItem = (props) => {
  const { item, canShip, canGenerateReceipt, canView } = props;
  return (
    <li className="list-item">
      <span className="item-bar">
        <Link className="highlight" to={`/dashboard/orders/${item._id}?action=view-details`}>
          {item.order_id}
        </Link>
      </span>
      <span className="item-bar">
        <div>
          <span>Name: </span>
          {item.customer_name}
        </div>
      </span>
      <span className="item-bar">{moment(item.created_at).format("h:mm A MMMM Do YY")}</span>
      <span className="item-bar">{item.package_description}</span>

      <span className="item-bar">Heavy</span>
      <span className="item-bar">{item.package_weight}</span>

      <span className="item-bar highlight">
        {canShip && (
          <Link to={`/dashboard/orders/ship-order/${item._id}`} className="link-btn">
            Ship Now
          </Link>
        )}
        {canGenerateReceipt && (
          <Link to={`/dashboard/orders/ship-order/#${item._id}`} className="link-btn">
            Reciept
          </Link>
        )}
        {canView && (
          <Link to={`/dashboard/orders/ship-order/#${item._id}`} className="link-btn">
            View
          </Link>
        )}
      </span>
    </li>
  );
};
