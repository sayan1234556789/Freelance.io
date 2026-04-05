import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/useAuthContext";
import { Link, useNavigate } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    skills: "",
    minBudget: "",
    maxBudget: "",
    page: 1,
    limit: 5,
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects", {
          params: filters,
        });
        setProjects(res.data.projects);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.page);
      } catch (error) {
        console.log(error.response?.data || error);
      }
    };

    fetchProjects();
  }, [filters]);

  return (
    <div className="bg-[#F9F7F7] min-h-screen text-[#112D4E] animate-fadeIn">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Explore Projects
            </h1>
            <p className="text-sm text-[#112D4E]/50 mt-1">
              Find projects that match your skills
            </p>
          </div>

          {user?.role === "client" && (
            <Link to="/projects" className="mt-4 md:mt-0">
              <button
                className="inline-flex items-center gap-2
                bg-[#3F72AF] text-white text-sm font-semibold
                px-5 py-2.5 rounded-lg
                hover:bg-[#112D4E]
                active:scale-95
                transition-all duration-200
                shadow-[0_2px_10px_rgba(63,114,175,0.3)]"
              >
                <span className="text-lg">+</span>
                Create Project
              </button>
            </Link>
          )}
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#DBE2EF] grid md:grid-cols-4 gap-3 shadow-sm mb-8">
          {["search", "skills", "minBudget", "maxBudget"].map((key) => (
            <input
              key={key}
              placeholder={
                key === "search"
                  ? "Search..."
                  : key === "skills"
                  ? "Skills"
                  : key === "minBudget"
                  ? "Min Budget"
                  : "Max Budget"
              }
              value={filters[key]}
              onChange={(e) =>
                setFilters({ ...filters, [key]: e.target.value, page: 1 })
              }
              className="px-4 py-2.5 rounded-lg border border-[#DBE2EF] bg-[#F9F7F7]
              text-sm placeholder:text-[#112D4E]/30
              outline-none focus:border-[#3F72AF]
              focus:ring-2 focus:ring-[#3F72AF]/20
              transition-all duration-200"
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.length === 0 ? (
            <p className="col-span-full text-center text-[#112D4E]/60">
              No projects found
            </p>
          ) : (
            projects.map((p) => (
              <div
                key={p._id}
                className="bg-white border border-[#DBE2EF] rounded-xl p-6
                transition-all duration-300 ease-out
                hover:shadow-xl hover:-translate-y-1"
              >
                <h2 className="font-semibold text-lg mb-2">{p.title}</h2>

                <p className="text-sm text-[#112D4E]/60 mb-4 line-clamp-3">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {p.skillsRequired?.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#DBE2EF] px-3 py-1 rounded-full
                      transition hover:bg-[#3F72AF] hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#DBE2EF]">
                  <div>
                    <p className="text-[10px] uppercase text-[#112D4E]/40">
                      Budget
                    </p>
                    <p className="font-semibold text-[#3F72AF]">₹ {p.budget}</p>
                  </div>

                  <button
                    onClick={() => navigate(`/projects/${p._id}`)}
                    className="bg-[#3F72AF] text-white text-sm font-normal
                    px-4 py-2 rounded-lg
                    hover:bg-[#112D4E]
                    active:scale-[0.95]
                    transition-all duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                page: prev.page - 1,
              }))
            }
            className="px-4 py-2 rounded-lg border text-sm
            hover:bg-[#3F72AF] hover:text-white
            disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, currentPage - 3),
              Math.min(totalPages, currentPage + 2),
            )
            .map((num) => (
              <button
                key={num}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    page: num,
                  }))
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  currentPage === num
                    ? "bg-[#112D4E] text-white shadow"
                    : "border hover:bg-[#3F72AF] hover:text-white"
                }`}
              >
                {num}
              </button>
            ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                page: prev.page + 1,
              }))
            }
            className="px-4 py-2 rounded-lg border text-sm
            hover:bg-[#3F72AF] hover:text-white
            disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
