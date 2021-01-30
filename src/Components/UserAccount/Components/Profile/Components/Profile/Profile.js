import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EditProfle from "../EditProfile/EditProfile";
import ManageCoverageArea from "../ManageCoverageArea/ManageCoverageArea";
import Addresses from "../Addresses/Addresses";

import { NavLink, useRouteMatch, Switch, Route, Redirect } from "react-router-dom";

import roles from "../../../../../../utils/roles";

function UserAccount() {
  let { path, url } = useRouteMatch();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(whomi());
  }, []);

  const userRoles = user && roles[user.User_type];

  console.log(`${path}/details`);

  return (
    <div className="profile-sec">
      <Row>
        <Col xs={3} md={3}>
          <div className="head-thumb">
            <span>Hello, </span>
            <span>{user.name}</span>
          </div>
          <div className="sidebar-links">
            <NavLink to={`${path}/details`}>My Info</NavLink>
            {userRoles && userRoles.includes("manageCoverage") && (
              <NavLink to={`${path}/coverage`}>Coverage</NavLink>
            )}

            <NavLink to={`${path}/addresses`}>Address</NavLink>
            <NavLink to={`${path}/notifications`}>Notifications</NavLink>
          </div>
        </Col>
        <Col xs={9} md={9}>
          <div className="profile-content">
            <Switch>
              {userRoles && userRoles.includes("manageCoverage") && (
                <Route path={`${path}/coverage`}>
                  <ManageCoverageArea />
                </Route>
              )}
              <Route path={`${path}/addresses`}>
                <Addresses />
              </Route>
              <Route path={`${path}/notifications`}>
                <div>Notifications</div>
              </Route>
              <Route path={`${path}/details`}>
                <EditProfle />
              </Route>
              <Redirect exact from={`${path}`} to={`${path}/details`}>
                <EditProfle />
              </Redirect>
            </Switch>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default UserAccount;
