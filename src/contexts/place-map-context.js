import React, { useReducer } from "react";

const MapLocationStateContext = React.createContext(false);
const MapLocationDispatchContext = React.createContext(null);

export const defaultZoom = 12;
export const defaultCenter = {lat:37.5647689, lng:126.7093638};

function mapLocationReducer(state, action) {
  switch (action.type) {
    case "zoom": {
      return { zoomLevel: action.zoomLevel }
    }

    case "location": {
      return { zoomLevel: action.zoomLevel, location: action.location }
    }

    case "reset": {
      return { zoomLevel: null, location: null }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = {
  zoomLevel: defaultZoom,
  location: defaultCenter
};

function MapLocationProvider({ children })  {
  const [state, dispatch] = useReducer(mapLocationReducer, initialState);
  return (
    <MapLocationStateContext.Provider value={state}>
      <MapLocationDispatchContext.Provider value={dispatch}>
        {children}
      </MapLocationDispatchContext.Provider>
    </MapLocationStateContext.Provider>
  );
}

function useMapLocationState() {
  const context = React.useContext(MapLocationStateContext);
  if (context === undefined) {
    throw new Error(`usePlaceListState must be used within a PlaceListProvider`);
  }
  return context;
}

function useMapLocationDispatch() {
  const context = React.useContext(MapLocationDispatchContext);
  if (context === undefined) {
    throw new Error(`usePlaceListDispatch must be used within a PlaceListProvider`);
  }
  return context;
}

function useMapLocation() {
  return [useMapLocationState(), useMapLocationDispatch()];
}

export { MapLocationProvider, useMapLocation, MapLocationStateContext }