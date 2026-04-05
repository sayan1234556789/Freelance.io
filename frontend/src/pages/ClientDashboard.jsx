import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/useAuthContext";
import { toast } from "react-toastify";

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

  const handleDelete = async(id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?")

    if(!confirmDelete) return

    try {
      const res = await api.delete(`/projects/${id}`)

      setProjects(projects.filter((e) => e._id !== id))

      toast.success("Deleted Successfully")
    } catch (error) {
      console.log(error.response?.data || error)
      toast.error("Error in deletion")
    }
  } 

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
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-xs text-[#112D4E]/40 uppercase tracking-wide">
                      Actions
                    </p>

                    <Link to={`/projects/${project._id}/applications`}>
                      <button
                        className="inline-flex items-center gap-2
                        bg-[#3F72AF] text-white text-sm font-semibold
                        px-4 py-2 rounded-lg
                        hover:bg-[#112D4E]
                        active:scale-95
                        transition-all duration-200
                        shadow-[0_3px_12px_rgba(63,114,175,0.35)]"
                      >
                        View Applications →
                      </button>
                    </Link>
                  </div>

                  <div className="flex gap-3">
                    <Link to={`/projects/edit/${project._id}`}>
                      <button
                        className="px-4 py-2 text-sm font-medium rounded-lg
                        border border-[#DBE2EF] text-[#112D4E]
                        hover:border-[#3F72AF] hover:text-[#3F72AF]
                        transition-all duration-200"
                      >
                        ✏️ Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(project._id)}
                      className="px-4 py-2 text-sm font-medium rounded-lg
                      border border-red-200 text-red-500
                      hover:bg-red-50 hover:border-red-400
                      transition-all duration-200"
                    >
                      🗑 Delete
                    </button>
                  </div>
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
