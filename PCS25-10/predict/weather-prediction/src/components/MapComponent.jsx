// import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { useState, useEffect } from "react";
// import L from "leaflet";

// // Fix leaflet marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// // Component to handle map clicks
// const ClickableMap = ({ setSelectedPosition }) => {
//   useMapEvents({
//     click(e) {
//       setSelectedPosition([e.latlng.lat, e.latlng.lng]);
//     },
//   });
//   return null;
// };

// // Component to auto-center the map when position is available
// const AutoCenterMap = ({ position }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (position) {
//       map.flyTo(position, map.getZoom());
//     }
//   }, [position, map]);
//   return null;
// };

// const MapComponent = () => {
//   const [position, setPosition] = useState(null);
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Get user's current location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setPosition([pos.coords.latitude, pos.coords.longitude]);
//           setLoading(false);
//         },
//         (err) => {
//           setError("Unable to retrieve your location");
//           setLoading(false);
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by your browser");
//       setLoading(false);
//     }
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-lg font-medium text-gray-600">Loading map...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-red-500 text-lg font-medium">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-50">
//       {/* Fixed container */}
//       <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 w-[800px] mx-auto">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">
//           Select Your Location
//         </h2>
//         <div className="relative rounded-lg overflow-hidden border border-gray-300">
//           {/* Apply width and centering directly to MapContainer */}
//           <MapContainer
//             center={position || [51.505, -0.09]}
//             zoom={13}
//             style={{
//               height: "500px",
//               width: "80%",
//               margin: "0 auto", // This ensures equal left and right margins
//             }}
//             className="rounded-lg"
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             {position && (
//               <>
//                 <AutoCenterMap position={position} />
//                 <Marker position={position}>
//                   <Popup>
//                     Your Current Location <br />
//                     Latitude: {position[0].toFixed(4)} <br />
//                     Longitude: {position[1].toFixed(4)}
//                   </Popup>
//                 </Marker>
//               </>
//             )}
//             {selectedPosition && (
//               <Marker position={selectedPosition}>
//                 <Popup>
//                   Selected Location <br />
//                   Latitude: {selectedPosition[0].toFixed(4)} <br />
//                   Longitude: {selectedPosition[1].toFixed(4)}
//                 </Popup>
//               </Marker>
//             )}
//             <ClickableMap setSelectedPosition={setSelectedPosition} />
//           </MapContainer>
//           <div className="absolute top-4 right-4 z-[1000] bg-white px-3 py-2 rounded-md shadow-sm text-sm text-gray-600">
//             {selectedPosition ? (
//               <>
//                 Selected: <br />
//                 Lat: {selectedPosition[0].toFixed(4)}, Lng: {selectedPosition[1].toFixed(4)}
//               </>
//             ) : (
//               "Click anywhere on the map to select location"
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MapComponent;



//                                                          ^
//                                                          |
//                                                          |
//                                                          |
//                                                      ^
                                            //PREVIOSULY BEST WORKING STAGE




                                        
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map clicks
const ClickableMap = ({ setSelectedPosition, onCoordinateSelect }) => {
  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      setSelectedPosition([lat, lng]);
      if (onCoordinateSelect) {
        onCoordinateSelect(lat, lng);
      }
    },
  });
  return null;
};

// Component to auto-center the map when position is available
const AutoCenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);
  return null;
};

const MapComponent = ({ onCoordinateSelect }) => {
  const [position, setPosition] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setLoading(false);
        },
        (err) => {
          setError("Unable to retrieve your location");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-600">Loading map...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-red-500 text-lg font-medium">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      {/* Fixed container */}
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 w-[800px] mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">
          Select Your Location
        </h2>
        <div className="relative rounded-lg overflow-hidden border border-gray-300">
          <MapContainer
            center={position || [28.752992, 77.497653]}
            zoom={13}
            style={{
              height: "500px",
              width: "80%",
              margin: "0 auto",
            }}
            className="rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {position && (
              <>
                <AutoCenterMap position={position} />
                <Marker position={position}>
                  <Popup>
                    Your Current Location <br />
                    Latitude: {position[0].toFixed(4)} <br />
                    Longitude: {position[1].toFixed(4)}
                  </Popup>
                </Marker>
              </>
            )}
            {selectedPosition && (
              <Marker position={selectedPosition}>
                <Popup>
                  Selected Location <br />
                  Latitude: {selectedPosition[0].toFixed(4)} <br />
                  Longitude: {selectedPosition[1].toFixed(4)}
                </Popup>
              </Marker>
            )}
            <ClickableMap
              setSelectedPosition={setSelectedPosition}
              onCoordinateSelect={onCoordinateSelect}
            />
          </MapContainer>
          <div className="absolute top-4 right-4 z-[1000] bg-white px-3 py-2 rounded-md shadow-sm text-sm text-gray-600">
            {selectedPosition ? (
              <>
                Selected: <br />
                Lat: {selectedPosition[0].toFixed(4)}, Lng: {selectedPosition[1].toFixed(4)}
              </>
            ) : (
              "Click anywhere on the map to select location"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;



//                                                          ^
//                                                          |
//                                                          |
//                                                          |
//                                                      ^
                                            //PREVIOSULY BEST WORKING STAGE



