import { useState } from "react";
import Rating from "@mui/material/Rating";
import url from "../assets/backend.json";
import { useParams } from "react-router";
import axios from "axios";

function AddReview() {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loc, setLoc] = useState({});
  const token = localStorage.getItem("token");
  const username = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const long = parseFloat(localStorage.getItem("lng"));
    const lati = parseFloat(localStorage.getItem("lat"));

    setLoc({ long, lati });
    try {
      console.log(loc);
      const res = await axios.post(
        `${url.url}/review`,
        {
          review,
          stars: rating,
          name: username.username,
          location: { long, lati },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      setReview("");
      setRating(0);
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    <form
      className="flex flex-col space-y-4 p-4 sm:p-6 md:p-8 max-w-md w-full bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Add Review"
        className="text-base sm:text-lg md:text-xl font-bold py-2 px-3 sm:py-3 sm:px-4 border border-gray-300 rounded-lg w-full"
      />
      <div className="flex justify-center">
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </div>
      <button
        type="submit"
        className="py-2 px-4 sm:py-3 sm:px-6 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
      >
        Submit Review
      </button>
    </form>
  );
}

export default AddReview;
