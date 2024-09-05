import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Map, { Marker, Popup } from "react-map-gl";
import maplibregl from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css';
import AddReview from "./AddReview";
import url from "../assets/backend.json";
import axios from "axios";

function Home() {
  const [err, setErr] = useState("");
  const [viewport, setViewport] = useState({
    latitude: 10.037977,
    longitude: 40.774838,
    zoom: 1,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${url.url}/get-reviews`);
        const reviewFetch = res.data.reviews;
        setReviews(reviewFetch);
      } catch (error) {
        setErr(error.response.data);
      }
    };

    fetchReviews();
  }, []);

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
    localStorage.setItem("lat", e.lngLat.lat);
    localStorage.setItem("lng", e.lngLat.lng);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {err !== "" ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-400 flex-col space-y-5 p-4">
          <h1 className="text-red-500 text-4xl sm:text-5xl text-center">{err}</h1>
          <Link
            to="/login"
            className="border-2 border-black px-4 py-2 sm:px-5 sm:py-2 rounded-xl bg-black text-white font-bold hover:bg-white hover:text-black hover:shadow-2xl hover:shadow-black"
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
          {reviews.map((review, index) => (
            <Marker
              key={index}
              latitude={review.location.lati}
              longitude={review.location.long}
              anchor="bottom"
              onClick={() => setPopupInfo(review)}
            >
              <div className="text-2xl cursor-pointer">📍</div>
            </Marker>
          ))}

          {popupInfo && (
            <Popup
              latitude={popupInfo.location.lati}
              longitude={popupInfo.location.long}
              onClose={() => setPopupInfo(null)}
              closeOnClick={false}
              className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-xs w-full"
            >
              <div>
                <h3 className="font-bold text-lg">Review by {popupInfo.user}</h3>
                <p>{popupInfo.review}</p>
                <p>Rating: {popupInfo.stars}⭐</p>
              </div>
            </Popup>
          )}

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
                className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-xs w-full"
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
