import httpInstance from "../../httpClient/httpClient";
import { actionTypes } from "../actionTypes/actionTypes";

export const addNewOrder = (payload) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "post",
      url: "/order/placeOrder",
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
      data: payload,
    })
      .then(function (response) {
        res();
      })
      .catch(function (error) {
        rej();
      });
  });
};

export const getOrders = (id) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "get",
      url: "/order/orders/" + id,
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        dispatch(setOrders({ orderList: response.data }));
        res();
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};

export const getOrder = (params) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "get",
      url: "/order/order/" + params.id,
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        dispatch(setOrders({ orderDetail: response.data }));
        res(response.data && response.data.orders);
      })
      .catch(function (error) {
        rej(error);
      });
  });
};

const setOrders = (payload) => {
  return {
    type: actionTypes.SET_ORDERS,
    payload,
  };
};

export const getMaterialTypes = () => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "get",
      url: "/order/materials",
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        res(response.data);
      })
      .catch(function (error) {
        rej(error.message);
      });
  });
};

export const getVehicleTypes = () => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "get",
      url: "/order/vehicles",
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        res(response.data);
      })
      .catch(function (error) {
        rej(error.message);
      });
  });
};

export const shipOrder = (payload) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "put",
      url: "/order/ship-order",
      data: payload,
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        res(response.data);
      })
      .catch(function (error) {
        rej(error.message);
      });
  });
};

export const verifyShipToken = (token) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "get",
      url: "/order/verify-ship-token/?token=" + token,
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        res(response.data);
      })
      .catch(function (error) {
        rej(error.message);
      });
  });
};

export const acceptOrder = (payload) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "post",
      url: "/order/accept-order",
      data: payload,
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        res(response.data);
      })
      .catch(function (error) {
        rej(error.message);
      });
  });
};

export const updateTrackingStatus = (payload) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "patch",
      url: "/order/update-tracking-status",
      data: payload,
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        res(response.data);
      })
      .catch(function (error) {
        rej(error.message);
      });
  });
};
