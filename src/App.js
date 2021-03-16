import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-datepicker/dist/react-datepicker.css";
import "./Assets/Style/Style.scss";
import theme from "./MaterialUI/theme";

import "./CSS/App.css";
import "./CSS/main.css";
import "./Assets/Style/myAccount/myAccount.scss";

import { appStore } from "./store";

import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp/SignUp";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
/* Admin account */
import AdminAccount from "./Components/UserAccount";

function App() {
  return (
    <Provider store={appStore}>
      <div className="App">
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Router>
            <div className="router">
              <Switch>
                {/* common components */}
                <Route exact path="/">
                  {/* <Login /> */}
                  <AdminLogin />
                </Route>
                <Route path="/dashboard">
                  <AdminAccount />
                </Route>
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      </div>
      <ToastContainer />
    </Provider>
  );
}

export default App;
