import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";

import AppHeader from "./components/layouts/AppHeader";
import AppSidebar from "./components/layouts/AppSidebar";

import { SidebarProvider } from "./contexts/sidebar-context";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <SidebarProvider>
          <AppHeader />
          <AppSidebar />
          <main>
            <Routes />
          </main>
        </SidebarProvider>
      </div>
    </Router>
  );
}

export default App;
