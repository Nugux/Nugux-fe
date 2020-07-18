import React, { useReducer } from "react";

const PlaceInfoStateContext = React.createContext(false);
const PlaceInfoDispatchContext = React.createContext(null);

function placeInfoReducer(state, action) {
  switch (action.type) {
    case "fetch": {
      return {
        ...state,
        selectedPlaceId: action.payload.id,
        placeInfo: action.payload.placeInfo
      }
    }

    case "resetInfo": {
      return {
        ...state,
        selectedPlaceId: null,
        placeInfo: null
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = {
  selectedPlaceId: null,
  placeInfo: {}
};

function PlaceInfoProvider({ children })  {
  const [state, dispatch] = useReducer(placeInfoReducer, initialState);
  return (
    <PlaceInfoStateContext.Provider value={state}>
      <PlaceInfoDispatchContext.Provider value={dispatch}>
        {children}
      </PlaceInfoDispatchContext.Provider>
    </PlaceInfoStateContext.Provider>
  );
}

function usePlaceInfoState() {
  const context = React.useContext(PlaceInfoStateContext);
  if (context === undefined) {
    throw new Error(`usePlaceListState must be used within a PlaceListProvider`);
  }
  return context;
}

function usePlaceInfoDispatch() {
  const context = React.useContext(PlaceInfoDispatchContext);
  if (context === undefined) {
    throw new Error(`usePlaceListDispatch must be used within a PlaceListProvider`);
  }
  return context;
}

function usePlaceInfo() {
  return [usePlaceInfoState(), usePlaceInfoDispatch()];
}

export { PlaceInfoProvider, usePlaceInfo }