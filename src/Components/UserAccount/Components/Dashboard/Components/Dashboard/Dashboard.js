import React from "react";

import { BsBag } from "react-icons/bs";

function OverView(props) {
  const {} = props;
  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-md-6 col-xl-4">
          <div className="card mb-3 widget-content bg-night-fade">
            <div className="widget-content-wrapper text-white">
              <div className="widget-content-left">
                <div className="widget-heading">Total Orders</div>
                <div className="widget-subheading">All order count</div>
              </div>
              <div className="widget-content-right">
                <div className="widget-numbers text-white">
                  <span>1896</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card mb-3 widget-content bg-arielle-smile">
            <div className="widget-content-wrapper text-white">
              <div className="widget-content-left">
                <div className="widget-heading">Completed</div>
                <div className="widget-subheading">Completed order count</div>
              </div>
              <div className="widget-content-right">
                <div className="widget-numbers text-white">
                  <span>568</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card mb-3 widget-content bg-happy-green">
            <div className="widget-content-wrapper text-white">
              <div className="widget-content-left">
                <div className="widget-heading">Processing</div>
                <div className="widget-subheading">Orders in process</div>
              </div>
              <div className="widget-content-right">
                <div className="widget-numbers text-white">
                  <span>46</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card-type-2 form-group sm-pd-10 sm-md-22 br-12 h-100p lblca p-lg  dashboard-shadow">
            <div className="col-xs-4 col-md-4 col-sm-6 centered">
              <span className="">
                <BsBag className="icon" />
              </span>
            </div>
            <div className="col-xs-8 col-md-8 col-sm-6 content centered">
              <div>
                <div className="font-14 mb0">Today's Orders 2</div>
                <div className="">Yesterday 1</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-type-2 bg-cyan  form-group sm-pd-10 sm-md-22 br-12 h-100p lblca p-lg dashboard-shadow">
            <div className="col-xs-4 col-md-4 col-sm-6 centered">
              <span className="">
                <BsBag className="icon" />
              </span>
            </div>
            <div className="col-xs-8 col-md-8 col-sm-6 content centered">
              <div className="font-14 mb0">Average Shipping Cost 123</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-type-2 bg-green form-group sm-pd-10 sm-md-22 br-12 h-100p lblca p-lg dashboard-shadow">
            <div className="col-xs-4 col-md-4 col-sm-6  centered">
              <span className="">
                <BsBag className="icon" />
              </span>
            </div>
            <div className="col-xs-8 col-md-8 col-sm-6 content centered">
              <div className="font-14 mb0">Todays's Revenue Rs 1000</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-5 col-lg-4">
          <div className="mb-3 card card-type-3">
            <div className="card-header-tab card-header">
              <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                Overall Shipment Status
              </div>
            </div>
            <div className="card-body">
              <div className="card-wrapper">
                <span>No Record Found</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-5 col-lg-4">
          <div className="mb-3 card card-type-3">
            <div className="card-header-tab card-header">
              <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                Revenue
              </div>
            </div>
            <div className="card-body">
              <div className="card-wrapper">
                <span>No Record Found</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-5 col-lg-4">
          <div className="mb-3 card card-type-3">
            <div className="card-header-tab card-header">
              <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                Delivery Performance
              </div>
            </div>
            <div className="card-body">
              <div className="card-wrapper">
                <span>No Record Found</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverView;
