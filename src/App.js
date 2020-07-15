import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { SwipeableDrawer } from "@material-ui/core";

import Routes from "./routes";

import AppHeader from "./components/AppHeader";
import TourSpotList from "./components/TourSpotList";

import "./App.css";

function App() {
  const [showList, setShowList] = useState(false);

  return (
    <Router>
      <div className="App">
        <SwipeableDrawer
          onClose={() => { }}
          onOpen={() => { }}
          open={showList}
          disableSwipeToOpen={true}
          disableBackdropTransition={true}
          BackdropProps={{ onClick: () => setShowList(false) }}>
          <TourSpotList onClose={() => setShowList(false) } />
        </SwipeableDrawer>

        <AppHeader onMenuClicked={()=>{setShowList(true)}}/>
        <main>
          <Routes />
        </main>
      </div>
    </Router>
  );
}

export default App;
