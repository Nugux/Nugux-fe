import React, { useReducer } from "react";

const SidebarStateContext = React.createContext(false);
const SidebarDispatchContext = React.createContext(null);

function sidebarReducer(state, action) {
  switch (action.type) {
    case "open": {
      return { sidebarOpen: true }
    }

    case "close": {
      return { sidebarOpen: false }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = {
  sidebarOpen: false,
};

function SidebarProvider({ children })  {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);
  return (
    <SidebarStateContext.Provider value={state}>
      <SidebarDispatchContext.Provider value={dispatch}>
        {children}
      </SidebarDispatchContext.Provider>
    </SidebarStateContext.Provider>
  );
}

function useSidebarState() {
  const context = React.useContext(SidebarStateContext);
  if (context === undefined) {
    throw new Error(`useSidebarState must be used within a SidebarProvider`);
  }
  return context;
}

function useSidebarDispatch() {
  const context = React.useContext(SidebarDispatchContext);
  if (context === undefined) {
    throw new Error(`useSidebarDispatch must be used within a SidebarProvider`);
  }
  return context;
}

function useSidebar() {
  return [useSidebarState(), useSidebarDispatch()];
}

export { SidebarProvider, useSidebar }