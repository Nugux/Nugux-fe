import React from "react";
import { Route } from "react-router-dom";

import Login from "./pages/Login";
import Main from "./pages/Main";

export default () => (
  <>
    <Route path="/login" component={Login} />
    <Route path="/" component={Main} />
  </>
)