import React from "react";
import { SwipeableDrawer } from "@material-ui/core";

import { useSidebar } from "../../../contexts/sidebar-context";
import TourSpotList from "../../TourSpotList";

function AppSidebar() {
  const [ sidebarState, sidebarDispatch ] = useSidebar();
  const handleCloseSidebar = () => {
    sidebarDispatch({ type: "close" });
  };

  return (
    <SwipeableDrawer
      onClose={() => { }}
      onOpen={() => { }}
      open={sidebarState.sidebarOpen}
      disableSwipeToOpen={true}
      disableBackdropTransition={true}
      BackdropProps={{ onClick: handleCloseSidebar }}>
      <TourSpotList onClose={() => {} } />
    </SwipeableDrawer>
  );
}

export default AppSidebar;
