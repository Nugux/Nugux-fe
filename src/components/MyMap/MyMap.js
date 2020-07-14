/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import GoogleMapReact from "google-map-react";

import "./MyMap.css";

function MyMapComponent() {
  console.log(process.env.REACT_APP_GOOGLE_MAP_KEY);
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={[37.5647689, 126.7093638]}
        defaultZoom={12}
      >
        {/*<span className="here" lat={37.6} lng={126} text={"여기"} />*/}
      </GoogleMapReact>
    </div>
  );
}

export default MyMapComponent;