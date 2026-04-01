import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/useAuthContext";

const ClientDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const res = await api.get("/projects/my-projects");
        setProjects(res.data.projects);
      } catch (error) {
        console.log(error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProjects();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/applications/${id}`, { status });

      setProjects((prev) =>
        prev.map((project) => ({
          ...project,
          applications: project.applications.map((app) =>
            app._id === id ? { ...app, status } : app,
          ),
        })),
      );
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return (
    <div className="bg-[#F9F7F7] min-h-screen text-[#112D4E]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>
            <p className="text-sm text-[#112D4E]/50 mt-1">
              Manage your projects and review applicants
            </p>

            {user?.role === "client" && (
              <Link to="/projects" className="md:hidden inline-block mt-4">
                <button className="inline-flex items-center gap-2 bg-[#3F72AF] text-white px-5 py-2.5 rounded-lg hover:bg-[#112D4E] transition shadow">
                  + Create Project
                </button>
              </Link>
            )}
          </div>

          {user?.role === "client" && (
            <Link to="/projects" className="hidden md:block">
              <button className="inline-flex items-center gap-2 bg-[#3F72AF] text-white px-5 py-2.5 rounded-lg hover:bg-[#112D4E] transition shadow">
                + Create Project
              </button>
            </Link>
          )}
        </div>

        {loading ? (
          <p className="text-center text-[#112D4E]/60 animate-pulse">
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#112D4E]/60 text-sm mb-2">
              You haven’t created any projects yet
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-6 rounded-xl border border-[#DBE2EF]
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <h2 className="text-lg font-semibold mb-2">{project.title}</h2>

                <p className="text-sm text-[#112D4E]/70 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.skillsRequired?.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#DBE2EF] px-3 py-1 rounded-full
                      hover:bg-[#3F72AF] hover:text-white transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#DBE2EF]">
                  <div>
                    <p className="text-[10px] uppercase text-[#112D4E]/40">
                      Budget
                    </p>
                    <p className="font-semibold text-[#3F72AF]">
                      ₹ {project.budget}
                    </p>
                  </div>

                  {project.deadline && (
                    <div>
                      <p className="text-[10px] uppercase text-[#112D4E]/40">
                        Deadline
                      </p>
                      <p className="text-xs">
                        {new Date(project.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-[10px] uppercase text-[#112D4E]/40">
                      Applicants
                    </p>
                    <p className="font-semibold">
                      {project.applications?.length || 0}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#DBE2EF]">
                  <h3 className="text-sm font-semibold mb-4 flex justify-between">
                    Applicants
                  </h3>

                  {project.applications?.length === 0 ? (
                    <p className="text-xs text-center text-[#112D4E]/50">
                      No applicants yet
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {project.applications.map((app) => (
                        <div
                          key={app._id}
                          className="bg-[#F9F7F7] border border-[#DBE2EF]
                          rounded-xl p-4 hover:shadow-sm transition"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-full bg-[#DBE2EF] flex items-center justify-center font-semibold text-[#3F72AF]">
                              {app.freelancerId?.name?.charAt(0)}
                            </div>

                            <div>
                              <p className="text-sm font-semibold">
                                {app.freelancerId?.name}
                              </p>
                              <p className="text-xs text-[#112D4E]/50">
                                {app.freelancerId?.email}
                              </p>
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="text-[10px] uppercase text-[#112D4E]/40 mb-1">
                              Proposal
                            </p>
                            <p className="text-sm bg-white border border-[#DBE2EF] p-3 rounded-lg">
                              {app.proposal}
                            </p>
                          </div>

                          <div className="flex justify-end gap-2">
                            {app.status === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateStatus(app._id, "accepted")
                                  }
                                  className="text-xs px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                  Accept
                                </button>

                                <button
                                  onClick={() =>
                                    updateStatus(app._id, "rejected")
                                  }
                                  className="text-xs px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            {app.status === "accepted" && (
                              <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
                                ✓ Accepted
                              </span>
                            )}

                            {app.status === "rejected" && (
                              <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-500">
                                ✕ Rejected
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
