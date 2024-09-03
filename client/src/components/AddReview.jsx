import { useState } from "react";
import Rating from '@mui/material/Rating';
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
    const long = localStorage.getItem("lng");
    const lati = localStorage.getItem("lat");

    setLoc({long, lati});
    try {
      const res = await axios.post(
        `${url.url}/review`,
        {
          review,
          stars: rating,
          name: username.username,
          location: loc
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
    <form className="flex flex-col space-y-4 justify-center iterms-center" onSubmit={handleSubmit}>
      <input
        type="text"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Add Review"
        className="text-xl font-bold py-2 px-4 border border-gray-300 rounded-lg"
      />
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue)
        }}
      />

      <button
        type="submit"
        className="py-2 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
      >
        Submit Review
      </button>
    </form>
  );
}

export default AddReview;
