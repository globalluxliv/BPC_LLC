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
              <Link to="/agent/664a1c34413c39f3d7fa02d4">
                {" "}
                {/* Use the actual user ID here */}
                <h3 className="text-2xl capitalize text-indigo-900 font-semibold">
                  Akm Mike Bhuiyan
                </h3>
              </Link>
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
            </div>
          </div>
        </div>

        {/* New Agent: Jane Doe */}
        <div className="flex flex-col gap-6 mt-16">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full lg:w-1/4 rounded-3xl overflow-hidden">
              <img
                src={QueenieImage}
                alt="Jane Doe"
                className="w-full h-full object-contain aspect-video lg:aspect-square"
              />
            </div>
            <div className="w-full lg:w-9/12 bg-blue-100 rounded-3xl flex flex-col justify-center p-8 lg:p-14">
              <Link to="/agent/66a6a7c652f384512b70c15f">
                {" "}
                {/* Use the actual user ID here */}
                <h3 className="text-2xl capitalize text-indigo-900 font-semibold">
                  Lixi Ma (Queenie)
                </h3>
              </Link>
              <span className="inline-block capitalize text-xl text-indigo-900 font-light mt-1.5 mb-5">
                Licensed Sales Person
              </span>
              <p className="text-indigo-900 opacity-75 leading-normal">
                {/* Jane's description */}
                Queenie Ma is a Real Estate professional licensed sales agent in
                New York City for over 12 years. Her expertise are sale,
                purchase, rental in residential, commercial and management
                condominiums and buildings. Queenie lives in the Battery Park
                City more than 25 years. She has grown to love, living in New
                York City after immigrated from China. For all these years live
                in the City, she has developed strong relationships with
                clients, owners, and real estate community fellows. Queenie is a
                very active and more productive RE professional in New York. She
                treats all her local and international clients as family members
                and willing to provide additional supports in the field. I am
                proud to be a team member of Battery Park City Residential LLC.
                You’re very welcome to contact us for your Real Estate needs and
                get some professional advices. Hope to meet you soon!
              </p>
              <br />
              <p>Phone: 646.285.8277</p>
              <p>Email: queenie@bpcresidential.com</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
