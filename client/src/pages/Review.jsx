import ReviewComponent from "../components/ReviewComponent";
import Footer from "../components/Footer";

const Review = () => {
  return (
    <div>
      <div className="flex flex-col justify-center dark:text-white items-center bg-slate-300 dark:bg-slate-800 pb-16">
        <h1 className="font-bold text-3xl mt-8">Review</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <ReviewComponent />
          <ReviewComponent />
          <ReviewComponent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Review;
