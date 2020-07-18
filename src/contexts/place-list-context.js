import React, { useReducer } from "react";

const PlaceListStateContext = React.createContext(false);
const PlaceListDispatchContext = React.createContext(null);

function placeListReducer(state, action) {
  switch (action.type) {
    case "fetch": {
      return { placeList: action.payload }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = {
  placeList: [],
};

function PlaceListProvider({ children })  {
  const [state, dispatch] = useReducer(placeListReducer, initialState);
  return (
    <PlaceListStateContext.Provider value={state}>
      <PlaceListDispatchContext.Provider value={dispatch}>
        {children}
      </PlaceListDispatchContext.Provider>
    </PlaceListStateContext.Provider>
  );
}

function usePlaceListState() {
  const context = React.useContext(PlaceListStateContext);
  if (context === undefined) {
    throw new Error(`usePlaceListState must be used within a PlaceListProvider`);
  }
  return context;
}

function usePlaceListDispatch() {
  const context = React.useContext(PlaceListDispatchContext);
  if (context === undefined) {
    throw new Error(`usePlaceListDispatch must be used within a PlaceListProvider`);
  }
  return context;
}

function usePlaceList() {
  return [usePlaceListState(), usePlaceListDispatch()];
}

export { PlaceListProvider, usePlaceList }