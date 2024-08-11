import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import Footer from "../components/Footer";

SwiperCore.use([Navigation]);

export default function AgentListings() {
  const { id } = useParams(); // Get the user ID from the URL
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [commercialSaleListings, setCommercialSaleListings] = useState([]);
  const [commercialLeaseListings, setCommercialLeaseListings] = useState([]);
  const [underContractListings, setUnderContractListings] = useState([]);
  const [temporarilyOffListings, setTemporarilyOffListings] = useState([]);
  const [soldListings, setSoldListings] = useState([]);
  const [rentedListings, setRentedListings] = useState([]);

  useEffect(() => {
    console.log("Fetching agent listings for user ID:", id); // Log the user ID

    const fetchAgentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?userId=${id}`); // Updated to use userId
        console.log("API response status:", res.status); // Log the response status
        if (!res.ok) {
          throw new Error(`Failed to fetch listings: ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Fetched data:", data); // Log the data fetched from the API
        filterAndSetListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchAgentListings();
  }, [id]);

  const filterAndSetListings = (listings) => {
    console.log("Filtering and setting listings..."); // Log to confirm this function is running
    const rent = [];
    const sale = [];
    const commercialSale = [];
    const commercialLease = [];
    const underContract = [];
    const temporarilyOff = [];
    const sold = [];
    const rented = [];

    listings.forEach((listing) => {
      console.log("Listing:", listing); // Log each listing
      if (listing.tempOff) {
        temporarilyOff.push(listing);
      } else if (listing.sold) {
        sold.push(listing);
      } else if (listing.rented) {
        rented.push(listing);
      } else if (listing.isUnderContract) {
        underContract.push(listing);
      } else {
        switch (listing.type) {
          case "rent":
            rent.push(listing);
            break;
          case "sale":
            sale.push(listing);
            break;
          case "commercial_sale":
            commercialSale.push(listing);
            break;
          case "commercial_lease":
            commercialLease.push(listing);
            break;
          default:
            break;
        }
      }
    });

    console.log("Rent Listings:", rent); // Log to see if listings are categorized correctly
    setRentListings(rent);
    setSaleListings(sale);
    setCommercialSaleListings(commercialSale);
    setCommercialLeaseListings(commercialLease);
    setUnderContractListings(underContract);
    setTemporarilyOffListings(temporarilyOff);
    setSoldListings(sold);
    setRentedListings(rented);
  };

  return (
    <div>
      {/* Swiper for Featured Listings */}
      <Swiper navigation>
        {[
          ...rentListings,
          ...saleListings,
          ...commercialSaleListings,
          ...commercialLeaseListings,
          ...underContractListings,
          ...temporarilyOffListings,
          ...soldListings,
          ...rentedListings,
        ].map((listing) => (
          <SwiperSlide key={listing._id}>
            <div
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="h-[500px]"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Listing Results */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Places for Rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?userId=${id}&type=rent`}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Places for Sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?userId=${id}&type=sale`}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {commercialSaleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Commercial Sales
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?userId=${id}&type=commercial_sale`}
              >
                Show more commercial sales
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {commercialSaleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {commercialLeaseListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Commercial Leases
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?userId=${id}&type=commercial_lease`}
              >
                Show more commercial leases
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {commercialLeaseListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {underContractListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Listings Under Contract
              </h2>
              <div className="flex flex-wrap gap-4">
                {underContractListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          </div>
        )}

        {temporarilyOffListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Temporarily Off Market Listings
              </h2>
              <div className="flex flex-wrap gap-4">
                {temporarilyOffListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          </div>
        )}

        {soldListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Sold Listings
              </h2>
              <div className="flex flex-wrap gap-4">
                {soldListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          </div>
        )}

        {rentedListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Rented Listings
              </h2>
              <div className="flex flex-wrap gap-4">
                {rentedListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
