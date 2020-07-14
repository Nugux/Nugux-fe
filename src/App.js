import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";

import AppHeader from "./layouts/AppHeader";
import AppFooter from "./layouts/AppFooter";

import "./App.css";
import "antd/dist/antd.css";

function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main>
          <Routes />
        </main>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
