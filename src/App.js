import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";

import AppHeader from "./components/layouts/AppHeader";
import AppSidebar from "./components/layouts/AppSidebar";

import { SidebarProvider } from "./contexts/sidebar-context";
import { PlaceListProvider } from "./contexts/place-list-context";
import {PlaceInfoProvider} from "./contexts/place-info-context";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <SidebarProvider>
          <PlaceListProvider>
            <PlaceInfoProvider>
            <AppHeader />
            <AppSidebar />
            <main>
              <Routes />
            </main>
            </PlaceInfoProvider>
          </PlaceListProvider>
        </SidebarProvider>
      </div>
    </Router>
  );
}

export default App;
