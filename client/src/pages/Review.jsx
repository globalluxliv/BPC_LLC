import ReviewComponent from "../components/ReviewComponent";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function Review() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch ("/api/review/get");
        const data = await res.json();
        setReviews(data)
      } catch (error) {
        log(error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center dark:text-white items-center bg-slate-300 dark:bg-slate-800 pb-16">
        <h1 className="font-bold text-3xl mt-8">Review</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {reviews.map((r) => (
                <ReviewComponent review={r} key={r._id}/>
              ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
