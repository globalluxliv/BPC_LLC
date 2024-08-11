import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    mapUrl: "",
    youtubeUrl: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 0,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    pet: false,
    gym: false,
    doorMan: false,
    sold: false,
    rented: false,
    underContract: false,
    tempOff: false,
    cc_tax: 0,
    date: "",
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };
  const agents = [
    {
      name: "Akm Mike Bhuiyan",
      email: "info@gllivings.com",
      phone: "212-884-2211",
      imageUrl: "/Mike.png",
      userRef: "664a1c34413c39f3d7fa02d4", // Unique user ID for Mike
    },
    {
      name: "Lixi Ma (Queenie)",
      email: "queenie@bpcresidential.com",
      phone: "646.285.8277",
      imageUrl: "/Queenie.png",
      userRef: "66a6a7c652f384512b70c15f", // Unique user ID for Queenie
    },
    // Add more agents as needed
  ];

  const handleAgentChange = (e) => {
    const selectedAgent = agents.find((agent) => agent.name === e.target.value);
    setSelectedAgent(selectedAgent);
  };

  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (
      e.target.id === "sale" ||
      e.target.id === "rent" ||
      e.target.id === "commercial_sale" ||
      e.target.id === "commercial_lease"
    ) {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer" ||
      e.target.id === "pet" ||
      e.target.id === "gym" ||
      e.target.id == "doorMan" ||
      e.target.id === "rented" ||
      e.target.id === "sold" ||
      e.target.id === "tempOff" ||
      e.target.id === "underContract"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: selectedAgent ? selectedAgent.userRef : currentUser._id, // Use selected agent's userRef or fallback to current user
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <input
            type="text"
            placeholder="Map URL"
            className="border p-3 rounded-lg"
            id="mapUrl"
            onChange={handleChange}
            value={formData.mapUrl}
          />
          <input
            type="text"
            placeholder="Youtube URL"
            className="border p-3 rounded-lg"
            id="youtubeUrl"
            onChange={handleChange}
            value={formData.youtubeUrl}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="commercial_sale"
                name="listingType"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "commercial_sale"}
              />
              <span>Commercial Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="commercial_lease"
                name="listingType"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "commercial_lease"}
              />
              <span>Commercial Lease</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            {/* <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div> */}
            {/* Conditionally render the checkboxes only if type is not "commercial" */}
            {formData.type !== "commercial_sale" &&
              formData.type !== "commercial_lease" && (
                <>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="pet"
                      className="w-5"
                      onChange={handleChange}
                      checked={formData.pet}
                    />
                    <span>Pet</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="gym"
                      className="w-5"
                      onChange={handleChange}
                      checked={formData.gym}
                    />
                    <span>Gym</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="doorMan"
                      className="w-5"
                      onChange={handleChange}
                      checked={formData.doorMan}
                    />
                    <span>Door Man</span>
                  </div>
                </>
              )}
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sold"
                className="w-5"
                onChange={handleChange}
                checked={formData.sold}
              />
              <span>Sold</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rented"
                className="w-5"
                onChange={handleChange}
                checked={formData.rented}
              />
              <span>Rented</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="underContract"
                className="w-5"
                onChange={handleChange}
                checked={formData.underContract}
              />
              <span>Under Contract</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="tempOff"
                className="w-5"
                onChange={handleChange}
                checked={formData.tempOff}
              />
              <span>Temporary Off</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="string"
              id="date"
              className="p-3 border border-gray-300 rounded-lg"
              onChange={handleChange}
              value={formData.date}
            />
            <p>Date</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="sqft"
              className="p-3 border border-gray-300 rounded-lg"
              onChange={handleChange}
              value={formData.sqft}
            />
            <p>SQFT</p>
          </div>
          <div className="flex flex-wrap gap-6">
            {/* Conditionally render Bed and Bathroom fields only if type is not "commercial" */}
            {formData.type !== "commercial_sale" &&
              formData.type !== "commercial_lease" && (
                <>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="bedrooms"
                      min="1"
                      max="10"
                      required
                      className="p-3 border border-gray-300 rounded-lg"
                      onChange={handleChange}
                      value={formData.bedrooms}
                    />
                    <p>Beds</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="bathrooms"
                      min="1"
                      max="10"
                      required
                      className="p-3 border border-gray-300 rounded-lg"
                      onChange={handleChange}
                      value={formData.bathrooms}
                    />
                    <p>Baths</p>
                  </div>
                </>
              )}
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                {formData.type === "rent" && (
                  <span className="text-xs">($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs">($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="cc_tax"
              className="p-3 border border-gray-300 rounded-lg"
              onChange={handleChange}
              value={formData.cc_tax}
            />
            <p>CC+TAX</p>
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="agent">Choose an Agent:</label>
            <select
              id="agent"
              onChange={handleAgentChange}
              value={selectedAgent.name}
              className="border p-3 rounded-lg"
            >
              {agents.map((agent) => (
                <option key={agent.name} value={agent.name}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
