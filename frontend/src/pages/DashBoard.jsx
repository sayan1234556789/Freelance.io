import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const FreelancerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/applications/me");
        setApplications(res.data);
      } catch (error) {
        console.log(error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="bg-[#F9F7F7] min-h-screen text-[#112D4E] animate-fadeIn">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            My Applications
          </h1>
          <p className="text-sm text-[#112D4E]/50 mt-1">
            Track your applied projects and their status
          </p>
        </div>

        {loading ? (
          <p className="text-center text-[#112D4E]/60 animate-pulse">
            Loading applications...
          </p>
        ) : applications.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#112D4E]/60 text-sm mb-2">
              You haven't applied to any projects yet
            </p>
            <p className="text-xs text-[#112D4E]/40">
              Explore projects and start applying 🚀
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white p-6 rounded-xl border border-[#DBE2EF]
                transition-all duration-300 ease-out
                hover:shadow-lg hover:-translate-y-1"
              >
                <h2 className="text-lg font-semibold mb-3">
                  {app.projectId?.title}
                </h2>

                <div className="flex justify-between items-center mb-5">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[#112D4E]/40">
                      Budget
                    </span>
                    <p className="text-sm font-semibold text-[#3F72AF]">
                      ₹ {app.projectId?.budget}
                    </p>
                  </div>

                  {app.projectId?.deadline && (
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] uppercase text-[#112D4E]/40">
                        Deadline
                      </span>
                      <p className="text-xs text-[#112D4E]/70">
                        {new Date(app.projectId.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-[#DBE2EF] mb-4">
                  <span className="text-[10px] uppercase text-[#112D4E]/40">
                    Status
                  </span>

                  {app.status === "pending" && (
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-600">
                      ⏳ Pending
                    </span>
                  )}

                  {app.status === "accepted" && (
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-100 text-green-600">
                      ✓ Accepted
                    </span>
                  )}

                  {app.status === "rejected" && (
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-red-100 text-red-500">
                      ✕ Rejected
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-[11px] uppercase text-[#112D4E]/40 mb-1">
                    Project Description
                  </p>
                  <p className="text-sm text-[#112D4E]/70 line-clamp-3">
                    {app.projectId?.description}
                  </p>
                </div>

                <div className="mb-5">
                  <p className="text-[11px] uppercase text-[#112D4E]/40 mb-1">
                    Your Proposal
                  </p>
                  <p className="text-sm text-[#112D4E]/80 bg-[#F9F7F7] p-3 rounded-lg border border-[#DBE2EF]">
                    {app.proposal}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/projects/${app.projectId._id}/applications`)}
                  className="w-full mt-3 px-4 py-2 text-sm font-medium rounded-lg
                  border border-[#3F72AF] text-[#3F72AF]
                  hover:bg-[#3F72AF] hover:text-white transition"
                 >
                  View Tasks →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerDashboard;
