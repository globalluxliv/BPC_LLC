import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "regularPrice_desc", // default to Price high to low
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);

      const urlParams = new URLSearchParams(window.location.search);

      // Fetch listings based on current URL parameters
      const searchQuery = urlParams.toString();
      console.log("Search Query:", searchQuery);

      try {
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();

        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [window.location.search]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSidebardata((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const [sort, order] = sidebardata.sort.split("_"); // Split sort and order from dropdown
    const urlParams = new URLSearchParams({
      searchTerm: sidebardata.searchTerm,
      type: sidebardata.type,
      sort,
      order,
    });

    if (sidebardata.offer) {
      urlParams.set("offer", sidebardata.offer);
    }

    if (sidebardata.parking) {
      urlParams.set("parking", sidebardata.parking);
    }

    if (sidebardata.furnished) {
      urlParams.set("furnished", sidebardata.furnished);
    }

    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("startIndex", startIndex);

    // Clear the type parameter if it's "all" to prevent overlap in the "Show More" results
    if (sidebardata.type === "all") {
      urlParams.delete("type");
    }

    const searchQuery = urlParams.toString();

    try {
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();

      // Filter out any listings that are already in the state to prevent duplicates
      const newListings = data.filter(
        (newListing) =>
          !listings.some(
            (existingListing) => existingListing._id === newListing._id
          )
      );

      if (newListings.length < 9) {
        setShowMore(false);
      }

      // Append the filtered new listings to the current state
      setListings([...listings, ...newListings]);
    } catch (error) {
      console.error("Error fetching more listings:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              name="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div> */}
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="radio"
                name="type"
                value="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>All</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="type"
                value="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="type"
                value="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="type"
                value="commercial_sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "commercial_sale"}
              />
              <span>Commercial Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="type"
                value="commercial_lease"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "commercial_lease"}
              />
              <span>Commercial Lease</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              name="sort"
              value={sidebardata.sort}
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
