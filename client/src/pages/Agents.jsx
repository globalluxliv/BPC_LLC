import React from "react";
import { Link } from "react-router-dom";
import MikeImage from "../photos/Mike.png";
import QueenieImage from "../photos/Queenie.png";
import Footer from "../components/Footer";

export default function Agents() {
  return (
    <div>
      <section className="max-w-screen-xl mx-auto py-20 px-8 lg:px-10">
        <h2 className="text-4xl xl:text-5xl capitalize text-center text-indigo-900 font-bold">
          Our Team
        </h2>
        <hr className="mx-auto w-12 h-1 outline-0 border-0 bg-green-300 block mt-4 mb-6" />
        <p className="text-center text-xl text-gray-800">
          Our team consists only of the best talents
        </p>

        {/* Mike Bhuiyan */}
        <div className="flex flex-col gap-6 mt-16">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full lg:w-1/4 rounded-3xl overflow-hidden">
              <img
                src={MikeImage}
                alt="Mike Bhuiyan"
                className="w-full h-full object-contain aspect-video lg:aspect-square"
              />
            </div>
            <div className="w-full lg:w-9/12 bg-blue-100 rounded-3xl flex flex-col justify-center p-8 lg:p-14">
              <h3 className="text-2xl capitalize text-indigo-900 font-semibold">
                Akm Mike Bhuiyan
              </h3>
              <span className="inline-block capitalize text-xl text-indigo-900 font-light mt-1.5 mb-5">
                Licensed Principal Broker
              </span>
              <p className="text-indigo-900 opacity-75 leading-normal">
                {/* Mike's description */}
                As a resident of New York for over 34 years, Mike Bhuiyan has
                extensive experience specializing in the ins and outs of this
                city. As a top-producing broker, his goal is to find his clients
                the best solutions using his dynamic ability to anticipate his
                client’s needs and exceeding their expectations every single
                time...
              </p>
              <br />
              <p>Phone: 212.884.2211</p>
              <p>Email: mbhuiyan@bpcresidential.com</p>
              <Link to="/agent/664a1c34413c39f3d7fa02d4">
                <button className="mt-4 px-4 py-2 bg-blue-800 text-white font-bold rounded hover:bg-blue-700">
                  View Listings
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Queenie Ma */}
        <div className="flex flex-col gap-6 mt-16">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full lg:w-1/4 rounded-3xl overflow-hidden">
              <img
                src={QueenieImage}
                alt="Queenie Ma"
                className="w-full h-full object-contain aspect-video lg:aspect-square"
              />
            </div>
            <div className="w-full lg:w-9/12 bg-blue-100 rounded-3xl flex flex-col justify-center p-8 lg:p-14">
              <h3 className="text-2xl capitalize text-indigo-900 font-semibold">
                Lixi Ma (Queenie)
              </h3>
              <span className="inline-block capitalize text-xl text-indigo-900 font-light mt-1.5 mb-5">
                Licensed Sales Person
              </span>
              <p className="text-indigo-900 opacity-75 leading-normal">
                {/* Queenie's description */}
                Queenie Ma is a Real Estate professional licensed sales agent in
                New York City for over 12 years. Her expertise are sale,
                purchase, rental in residential, commercial and management
                condominiums and buildings. Queenie lives in the Battery Park
                City more than 25 years...
              </p>
              <br />
              <p>Phone: 646.285.8277</p>
              <p>Email: queenie@bpcresidential.com</p>
              <Link to="/agent/66a6a7c652f384512b70c15f">
                <button className="mt-4 px-4 py-2 bg-blue-800 text-white font-bold rounded hover:bg-blue-700">
                  View Listings
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
