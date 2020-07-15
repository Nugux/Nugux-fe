import React, {useState} from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";

import AppHeader from "./layouts/AppHeader";
import AppFooter from "./layouts/AppFooter";

import "./App.css";
import "antd/dist/antd.css";
import {SwipeableDrawer} from "@material-ui/core";
import TourSpotList from "./components/TourSpotList";

function App() {
    const [showList, setShowList] = useState(false);
  return (
    <Router>
      <div className="App">
          <SwipeableDrawer
              onClose={() => {
              }}
              onOpen={() => {
              }}
              open={showList}
              disableSwipeToOpen={true}
              disableBackdropTransition={true}
              BackdropProps={{
                  onClick:()=>{
                      setShowList(false);
                  }
              }}
          >
              <TourSpotList
                  onClose={() => {
                      setShowList(false);
                  }}
              />
          </SwipeableDrawer>
        <AppHeader onMenuClicked={()=>{setShowList(true)}}/>
        <main>
          <Routes />
        </main>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
