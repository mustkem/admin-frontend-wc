import httpInstance from "../../httpClient/httpClient";

import { actionTypes } from "../actionTypes/actionTypes";

export const clickHandler = (data) => {
  return {
    type: actionTypes.GET_DATA,
    payload: data,
  };
};

export const login = (payload) => (dispatch) => {
  return new Promise((res, rej) => {
    dispatch({
      type: actionTypes.USER_LOGIN,
      payload: {
        data: null,
        loading: true,
      },
    });
    httpInstance({
      method: "post",
      url: "/auth/login",
      data: payload,
    })
      .then(function (response) {
        const userData = JSON.parse(atob(response.data.token.split(".")[1]));
        dispatch({
          type: actionTypes.USER_LOGIN_SUCCESS,
          payload: userData,
        });
        localStorage.setItem("ship-token", response.data.token);
        localStorage.setItem("ship_user_data_access", JSON.stringify(userData));
        res();
      })
      .catch(function () {
        dispatch({
          type: actionTypes.USER_LOGIN_FAILED,
          payload: {
            error: "Something went wrong",
          },
        });
      });
  });
};

const setLogin = (payload) => {
  return {
    type: actionTypes.USER_LOGIN,
    payload,
  };
};
// TODO - add token to signup
export const signup = (payload) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "put",
      url: "/auth/signup",
      data: payload,
    })
      .then(function (response) {
        // const userData = JSON.parse(atob(response.data.token.split(".")[1]));
        // dispatch(setLogin(userData));
        res();
      })
      .catch(function (error) {
        console.log(error);
        res();
      });
  });
};

export const updateProfile = (payload) => (dispatch) => {
  return new Promise((res, rej) => {
    console.log(payload);
    httpInstance({
      method: "put",
      url: "/users/user/" + payload.id,
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
      data: payload,
    })
      .then(function (response) {
        dispatch(setLogin(response.data));
        localStorage.setItem("ship_user_data_access", JSON.stringify(response.data));
        res();
      })
      .catch(function (error) {
        console.log(error);
        rej();
      });
  });
};

export const whomi = (payload) => (dispatch) => {
  return new Promise((res, rej) => {
    // httpInstance({
    //   method: "get",
    //   url: "/whomi",
    //   headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    // })
    //   .then(function (response) {
    //     // const userData = JSON.parse(atob(response.data.token.split('.')[1]));
    //     const userData = {
    //       user: {
    //         name: "Mustkeem Khan",
    //       },
    //       email: "test@gmail.com",
    //       userId: "5e7ae78aff9caf0004c5b1b3",
    //       iat: 1586057968,
    //       exp: 1586061568,
    //     };
    //     //dispatch(setLogin(userData));
    //     res();
    //   })
    //   .catch(function (error) {
    //     const userData = {
    //       user: {
    //         name: "Mustkeem Khan",
    //       },
    //       email: "test@gmail.com",
    //       userId: "5e7ae78aff9caf0004c5b1b3",
    //       iat: 1586057968,
    //       exp: 1586061568,
    //     };
    //     //dispatch(setLogin(userData));
    //     console.log(error);
    //   });
  });
};

export const setStates = (payload) => {
  return {
    type: actionTypes.SET_STATES,
    payload,
  };
};

export const getStates = () => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "get",
      url: "/users/states",
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        dispatch(setStates({ states: response.data.States }));
        res();
      })
      .catch(function (error) {
        console.log(error);
        rej();
      });
  });
};

export const getCities = (payload) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "post",
      url: "/users/cities",
      data: { stateId: payload.id },
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        res(response.data.Cities);
      })
      .catch(function (error) {
        rej(error.response);
      });
  });
};

export const getPincodes = (payload) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "post",
      url: "/users/pinCodes",
      data: payload,
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        res(response.data.Pincodes);
      })
      .catch(function (error) {
        rej(error.response);
      });
  });
};

export const addCoverageArea = (payload) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "post",
      url: "/users/addcoverageArea",
      data: payload,
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        res(response.data.Cities);
        dispatch(getCoverageArea(payload.user));
      })
      .catch(function (error) {
        rej(error.response);
      });
  });
};

export const addAddress = (payload) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "post",
      url: "/users/addAddress",
      data: payload,
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        res(response.data.data.userId);
        dispatch(getAddresses(response.data.data.userId));
      })
      .catch(function (error) {
        rej(error.response);
      });
  });
};

export const getAddresses = (userId) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "post",
      data: { userId },
      url: "/users/getAddress",
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        dispatch(
          setAddresses({
            addresses: response.data.data,
          })
        );
        res("success");
      })
      .catch(function (error) {
        rej(error.response);
      });
  });
};

export const setAddresses = (payload) => {
  return {
    type: actionTypes.SET_ADDRESSES,
    payload,
  };
};

export const getCoverageArea = (user_id) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "get",
      url: "/users/coverage-area/" + user_id,
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        dispatch(
          setCoverageArea({
            coverage: response.data.coverage,
          })
        );
        res("success");
      })
      .catch(function (error) {
        rej(error.response);
      });
  });
};

export const setCoverageArea = (payload) => {
  return {
    type: actionTypes.SET_COVERAGE_AREA,
    payload,
  };
};
export const deleteAddress = (payload) => (dispatch) => {
  console.log("testttt");
  return new Promise((res, rej) => {
    httpInstance({
      method: "post",
      data: payload,
      url: "/users/deleteAddress",
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        dispatch(getAddresses(payload.userId));
        res("success");
      })
      .catch(function (error) {
        rej(error.response);
      });
  });
};

export const deleteCoverageItem = (payload) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "delete",
      url: "/users/coverage-area/" + payload.coverage_id,
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        dispatch(getCoverageArea(payload.user_id));
        res("success");
      })
      .catch(function (error) {
        rej(error.response);
      });
  });
};

export const deleteCoverageArea = (payload) => {
  return {
    type: actionTypes.DELETE_COVERAGE_AREA,
    payload,
  };
};

export const getTransportors = (payload) => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "post",
      url: "/users/getTransporters",
      data: payload,
      headers: { Authorization: `Bearer ${localStorage.getItem("ship-token")}` },
    })
      .then(function (response) {
        res(response.data.data);
      })
      .catch(function (error) {
        rej(error.response);
      });
  });
};

export const verifyUser = () => (dispatch) => {
  return new Promise((res, rej) => {
    httpInstance({
      method: "get",
      url: "/users/verify-user/?token=" + localStorage.getItem("ship-token"),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ship-token")}`,
      },
    })
      .then(function (response) {
        const userData = JSON.parse(atob(response.data.token.split(".")[1]));
        dispatch(setLogin(userData));
        res(response.data);
      })
      .catch(function (error) {
        rej(error.message);
      });
  });
};
