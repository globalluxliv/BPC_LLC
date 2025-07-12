/*import React from "react";
import { Link } from "react-router-dom";
import MikeImage from "../photos/Mike.png";
import QueenieImage from "../photos/Queenie.png";
import Footer from "../components/Footer";
*/
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Agents() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setAgents(data);
      } catch (err) {
        console.error("Failed to fetch agents", err);
      }
    };
    fetchAgents();
  }, []);

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Our Team</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {agents.map((agent) => (
          <div key={agent._id} className="shadow-lg p-6 rounded-xl bg-white">
            <img
              src={
                {
                  Mike: "Mike.png",
                  queenie: "Queenie.png",
                }[agent.username] ||
                agent.avatar || // fallback if user manually set avatar in DB
                ""
              }
              alt={agent.username}
              className="w-32 h-32 object-cover rounded-full mx-auto"
            />

            <h3 className="mt-4 text-xl font-semibold">{agent.username}</h3>
            {agent.position && (
              <p className="text-sm text-gray-600">{agent.position}</p>
            )}
            {agent.description && (
              <p className="mt-2 text-gray-700">{agent.description}</p>
            )}
            <Link
              to={`/agent-listings/${agent._id}`}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Listings
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
