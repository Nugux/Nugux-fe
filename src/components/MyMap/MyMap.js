/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

import "./MyMap.css";

function MyMapComponent() {
  const [location, setLocation] = useState([37.5647689, 126.7093638]);

  const handleDragEnd = ({ center }) => {
    setLocation([center.lat(), center.lng()]);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={location}
        yesIWantToUseGoogleMapApiInternals
        defaultZoom={12}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
}

export default MyMapComponent;