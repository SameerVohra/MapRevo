import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Map, { Marker, Popup } from "react-map-gl";
import maplibregl from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css';
import AddReview from "./AddReview";

function Home() {
  const [err, setErr] = useState("");
  const [viewport, setViewport] = useState({
    latitude: 21.037977,
    longitude: 75.774838,
    zoom: 3,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErr("Login to continue");
    }
  }, []);

  const handleReview = (e) => {
    setSelectedLocation({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });
    console.log(`Longitude: ${e.lngLat.lng}, Latitude: ${e.lngLat.lat}`);
    localStorage.setItem("lat", e.lngLat.lat);
    localStorage.setItem("lng", e.lngLat.lng);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {err !== "" ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-400 flex-col space-y-5">
          <h1 className="text-red-500 text-5xl">{err}</h1>
          <Link
            to="/login"
            className="border-2 border-black px-5 py-2 rounded-xl bg-black text-white font-bold hover:bg-white hover:text-black hover:shadow-2xl hover:shadow-black"
          >
            LOGIN
          </Link>
        </div>
      ) : (
        <Map
          className="w-full h-full"
          mapLib={maplibregl}
          initialViewState={viewport}
          onMove={(evt) => setViewport(evt.viewState)}
          style={{ width: "100%", height: "100%" }}
          mapStyle={`${import.meta.env.VITE_MAP_URL}`}
          onClick={handleReview}
          transitionDuration="200"
        >
          {selectedLocation && (
            <Marker
              latitude={selectedLocation.latitude}
              longitude={selectedLocation.longitude}
              anchor="bottom"
            >
              <Popup
                latitude={selectedLocation.latitude}
                longitude={selectedLocation.longitude}
                onClose={() => setSelectedLocation(null)}
                className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg"
              >
                <AddReview />
              </Popup>
            </Marker>
          )}
        </Map>
      )}
    </div>
  );
}

export default Home;
